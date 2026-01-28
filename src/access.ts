export default function (initialState: any) {
    const {user} = initialState;
    return {
        isAdmin: user?.role === "admin",
        isLogin: !!user,
    }
}