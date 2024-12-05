const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();

const sendNotification = async (message) => {
    try {
        const response = await admin.messaging().send(message);
        console.log("Notification sent successfully:", response);
        return response;
    } catch (error) {
        console.error("Error sending notification:", error);
        throw new Error(error.message);
    }
};

exports.sendChatMessageNotification = functions.firestore
    .onDocumentCreated(
        "groups/{groupId}/chats/{messageId}",
        async (snapshots, context)=>{

    const groupId = snapshots.params.groupId;
    const messageId = snapshots.params.messageId;
    const message =
        (await admin.firestore().collection("groups").doc(groupId).collection("chats").doc(messageId).get())
        .data().text

    admin.firestore().collection("groups").doc(groupId).get().then((doc) => {
        const group = doc.data();
        const members = group.members;

        const notification = {
            title: "New Message",
            body: message,
        };

        members.forEach(async (member) => {
            const userDoc = await admin.firestore().collection("users").doc(member).get();
            const user = userDoc.data();

            if (user.fcmToken) {
                const message = {
                    notification,
                    token: user.fcmToken,
                };

                await admin.messaging().send(message);
            }
        });
    });


    })

exports.sendEmergencyNotification = functions.firestore
    .onDocumentCreated("groups/{groupId}/emergencyNotifications/{notificationId}", async (snapshot, context) => {
        const groupId = context.params.groupId;

        // Get emergency notification data
        const { triggeredBy, buttonTitle, timestamp } = snapshot.data();

        // Fetch group information
        const groupDoc = await admin.firestore().collection("groups").doc(groupId).get();
        const group = groupDoc.data();
        const members = group.members;

        // Prepare notification payload
        const notification = {
            title: `Emergency Alert: ${buttonTitle}`,
            body: `Triggered by ${triggeredBy} at ${new Date(timestamp).toLocaleString()}`,
        };

        // Send notifications to all members
        const promises = members.map(async (member) => {
            const userDoc = await admin.firestore().collection("users").doc(member).get();
            const user = userDoc.data();

            if (user && user.fcmToken) {
                const message = {
                    notification,
                    token: user.fcmToken,
                };

                try {
                    await admin.messaging().send(message);
                } catch (error) {
                    console.error(`Failed to send notification to ${member}:`, error);
                }
            }
        });

        await Promise.all(promises);
    });

