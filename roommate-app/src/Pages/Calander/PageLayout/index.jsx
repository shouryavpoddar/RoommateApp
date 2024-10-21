const Layout = ({ children, ...restProps }) => {
    return (
        <div className={"flex-1 bg-purple-500 p-4"} {...restProps}>
        {children}
        </div>
    );
}

