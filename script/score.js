(function (d, s, id) {
        let js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = 'https://www.scorebat.com/embed/embed.js?v=arrv';
        fjs.parentNode.insertBefore(js, fjs);
    }
    (document, 'script', 'scorebat-jssdk'))