fx_version 'cerulean'
lua54 'yes'
game 'gta5'

name 'pxLoadingScreen'
author 'Pixel <https://codemeapixel.dev>'
description 'Premium Loading Screen Customizable with Music & Video Support'
repository 'https://github.com/CodeMeAPixel/pxLoadingScreen'
license 'GPL-3.0-or-later'
version '0.2.0'

loadscreen 'index.html'
loadscreen_manual_shutdown 'yes'
loadscreen_cursor 'yes'

client_script 'client.lua'

files {
    'index.html',
    'config.js',
    'build/**/*',
    'media/music/**/*',
    'media/gifs/**/*'
}
