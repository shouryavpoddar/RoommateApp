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
