import { users } from "../../src/api-server/auth.ts";
import { sendUpdate } from "../../src/api-server/websocket.ts";
import { registerGlobalAction } from "../../src/plugins.ts";

registerGlobalAction({
    id: "toggle-app-theme",
    name: "Toggle app theme",
    fields: [
        {
            id: "user",
            type: "select",
            label: "Affected user",
            description: "Apps logged in as the selected user will change theme.",
            default: "*",
            required: true,
            showSearchBar: 10,
            options: {
                isLazy: true,
                loadOn: "render",
                callback() {
                    return [
                        { value: "*", label: "Everyone" },
                        ...Object.keys(users).map(username=> ({value: username, label: username}))
                    ]
                },
            }
        },
        {
            id: "theme",
            type: "radio",
            label: "Set theme to",
            default: "system",
            required: true,
            options: {
                "light": "Light",
                "dark": "Dark",
                "system": "Match system",
            }
        }
    ],
    perform(options) {
        const username = options.user as string;
        const theme = options.theme as "light"|"dark"|"system";
        sendUpdate({
            type: "setTheme",
            theme
        }, username);
    },
})