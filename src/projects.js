export const repos = {
    "/companyx/xlib": {
        "vcs": "git",
        "repo": "git+ssh://git@gitlab.com/companyx/secretlib",
        "hasAuth": true,
        "auth": {
            "user": "fff",
            "pass": "password"
        }
    },
    "/amirarsalan/withAuth": {
        "vcs": "git",
        "repo": "https://github.com/amirarsalan/GoIsTrolly",
        "hasAuth": true,
        "auth": {
            "user": "fff",
            "pass": "password"
        }
    },
    "/amirarsalan/withoutAuth": {
        "vcs": "git",
        "repo": "https://github.com/amirarsalan/GoIsTrolly",
        "hasAuth": false
    }
}