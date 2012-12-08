/** GetCookie
 *
 * @autor : Rafael Erthal
 * @since : 2012-08
 *
 * @description : pega um cookie do navegador
 * @param c_name : nome do cookie
 */
function getCookie(c_name)
{
    var i,
        x,
        y,
        ARRcookies = document.cookie.split(";"),
        res;

    for (i=0; i < ARRcookies.length; i++) {
        x = ARRcookies[i].substr(0, ARRcookies[i].indexOf("="));
        y = ARRcookies[i].substr(ARRcookies[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g,"");

        if (x==c_name) {
            res = unescape(y);
        }
    }
    return res;
}

/** SetCookie
 *
 * @autor : Rafael Erthal
 * @since : 2012-08
 *
 * @description : insere um cookie do navegador
 * @param c_name : nome do cookie
 * @param value : valor do cookie
 * @param exdays : periodo de expiração do cookie
 */
function setCookie(c_name,value,exdays)
{
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);

    var c_value = escape(value) + ((exdays==null) ? "" : "; expires=" + exdate.toUTCString());
    document.cookie = c_name + "=" + c_value;
}