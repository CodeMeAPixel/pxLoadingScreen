fx_version 'cerulean'
game 'gta5'

author 'pxMechanic Team'
description 'Premium Loading Screen - Customizable with Music & Video Support'
version '0.1.0'

loadscreen 'index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

client_script 'client.lua'

files {
    'index.html',
    'config.js',
    'build/**/*',
    'media/**/*',
}
