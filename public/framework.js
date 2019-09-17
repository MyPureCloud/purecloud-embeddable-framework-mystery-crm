var parentDomain;

if(!window.console){
    window.console = {
        log: function(){},
        error: function(){},
        warning: function(){}
    };
}

var url = window.location.search;
var segments = url.replace('?', '').split('&');
for(var i = 0; i < segments.length; i++){
    if(segments[i].indexOf('parentDomain') >= 0){
        var keyValue = segments[i].split('=');
        parentDomain = keyValue[1];
    }
}

var callLogMapping={};

function setupFramework(parentSettings){
    window.Framework = {
        config: {
            name:parentSettings.name,
            settings: parentSettings.settings,
            clientIds: parentSettings.clientIds,            
            customInteractionAttributes: parentSettings.customInteractionAttributes,
        },
        initialSetup: function () {
            window.PureCloud.subscribe([
                {
                    type: 'Interaction', 
                    callback: function (category, interaction) {
                        window.parent.postMessage(JSON.stringify({type:"interactionSubscription", data:{category:category, interaction:interaction}}) , parentDomain);
                    }  
                },
                {
                    type: 'UserAction', 
                    callback: function (category, data) {
                        window.parent.postMessage(JSON.stringify({type:"userActionSubscription", data:{category:category, data:data}}) , parentDomain);
                    }  
                },
                {
                    type: 'Notification', 
                    callback: function (category, data) {
                        window.parent.postMessage(JSON.stringify({type:"notificationSubscription", data:{category:category, data:data}}) , parentDomain);
                    }  
                }
            ]);
        },
        screenPop: function (searchString, interaction) {
            window.parent.postMessage(JSON.stringify({type:"screenPop", data:{searchString:searchString, interaction:interaction}}) , parentDomain);
        },
        processCallLog: function (callLog, interaction, eventName, onSuccess, onFailure) {
            callLogMapping[interaction.id] = {callLog: callLog, onSuccess:onSuccess, onFailure: onFailure};
            window.parent.postMessage(JSON.stringify({type:"processCallLog" , data:{callLog:callLog, interaction:interaction}}) , parentDomain);
        },
        openCallLog: function(callLog, interaction){
            window.parent.postMessage(JSON.stringify({type:"openCallLog" , data:{callLog:callLog, interaction:interaction}}) , parentDomain);
        }
    };
}


window.parent.postMessage(JSON.stringify({ type:'settingsRequest'}), parentDomain);

window.addEventListener("message", function(event){
    try{
        let message = JSON.parse(event.data);
        if(message){
            if(message.type == 'init'){
                setupFramework(message);
            } else if(message.type == "clickToDial"){
                window.PureCloud.clickToDial(message.data);
            } else if(message.type == "addAssociation"){
                window.PureCloud.addAssociation(message.data);
            }else if(message.type == "addAttribute"){
                window.PureCloud.addCustomAttributes(message.data);
            } else if(message.type == "processCallLogCompleted"){
                var mapping = callLogMapping[message.interaction.id];
                delete callLogMapping[message.interaction.id];
                if(mapping && mapping.onSuccess){
                    mapping.onSuccess({
                        id:message.callLogId
                    });
                }
            }
        }
    }catch(error){
        // catch error
    }
});