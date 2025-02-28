
import homepage from "./html/homepage.html";
import notfound from "./html/404.html";

export const renderHTML = (page) => {
    let htmlPage = "";
    switch (page) {
        case "home":
            htmlPage = homepage;
            break
        default:
            htmlPage = notfound;
    }

    return new Response(htmlPage, {
        headers: {
            'Content-Type': 'text/html',
        }
    });
}