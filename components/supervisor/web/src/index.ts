/**
 * Copyright (c) 2020 TypeFox GmbH. All rights reserved.
 * Licensed under the GNU Affero General Public License (AGPL).
 * See License-AGPL.txt in the project root for license information.
 */

require('../public/index.css');

// TODO window.title = 

window.addEventListener('DOMContentLoaded', () => {
    window.addEventListener("message", evt => {
        if (evt.isTrusted && evt.data.type == 'relocate' && evt.data.url) {
            window.location.href = evt.data.url;
        }
    }, false);

    let segs = window.location.host.split('.');
    let startURL = window.location.protocol + '//' + segs.splice(2, 4).join('.') + '/start/#' + segs[0];
    if (window.location.host.includes("localhost") || window.location.pathname.substring(0, 11) === "/workspace/") {
        // /workspace/ paths are used for all path-routed ingress modes, e.g. pathAndHost or noDomain
        segs = window.location.pathname.split('/');
        startURL = window.location.protocol + '//' + window.location.host + '/start/#' + segs[segs.length - 2];
    }

    const loadingScreen = document.createElement('iframe');
    loadingScreen.src = startURL;
    loadingScreen.className = 'gitpod-loading-screen';
    document.body.appendChild(loadingScreen);
});