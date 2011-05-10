/**
* Truncates a string to specified length.
*
* @param {string} string to truncate
* @param {int} maximum length of truncated string
* @param {bool} If true, an ellipsis will be added to the end of the truncated string
* @return {string} Retruns truncated string. If string is shorter than len, unmodified string is returned.
*/
function truncate(str, len, dots)
{
    var ret = str;
    if(str.length > len)
    {
        ret = str.substring(0, len-1);
        if(dots)
            ret += "...";
    }
    
    return ret;
}

/**
* Get the URL for an application icon of specified size.
*
* @param {array of IconInfo} appIcons Array of IconInfo, includes size and url.
* @param {int} size Required size.
* @return {string} Returns URL to app icon of required size. If the app does not have an icon of required size,
*         the last (largest) icon found is returned.
*/

function findIcon(appIcons, size)
{
    for (i in appIcons)
    {
        if(appIcons[i].size == size)
            return appIcons[i].url;
    }
    return appIcons[appIcons.length-1].url;
}

/**
* Stuff to be done at launch
*/
$(document).ready(function(){
    /*
     * Initialization
     */
    // Apps menu
    if (localStorage['show_apps'] === 'true') {
        $('#main').show();
        chrome.management.getAll(function(list) {
            c = 0;
            for (var i in list)
            {
                var app = list[i];
                if(app.isApp && app.enabled)
                {
                    //console.log(app.name + "--" + app.id);
                    var appId = app.id;
                    var appName = app.name;
                    var appIcon = findIcon(app.icons, 128);
                    var div = document.createElement('div');
                    $(div).addClass('app');
                    //$(div).css('left', (130 + 130*c) + "px")
                    var a = document.createElement('a');
                    $(a).click(function() { chrome.management.launchApp(this.id); });
                    $(a).attr("href", "#");
                    $(a).attr("id", appId);
                    $(a).css('background-image',"url(" + appIcon + ")");
                    $(a).append(appName);
                    $(div).append(a);
                    $('#appsMenu').append(div);
                    c = c + 1;
                }
            }
            c = c + 1;
            $('#main').css('height', 60 + (140 * (c/7)) + 'px');
            var appName = "Web Store";
            var appIcon = "webstore.png";
            
            var div = document.createElement('div');
            $(div).addClass('app');
            var a = document.createElement('a');
            $(a).attr("href", "https://chrome.google.com/webstore");
            $(a).attr("id", "pjkljhegncpnkpknbcohdijeoejaedia");
            $(a).css('background-image',"url(" + appIcon + ")");
            $(a).append(appName);
            $(div).append(a);
            $('#appsMenu').append(div);
            
        });
    }
});