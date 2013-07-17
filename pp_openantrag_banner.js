$("#pp_openantrag_banner_linkage").ready(function() {
    var pp_openantrag_banner_timer;
    var pp_openantrag_banner_current = 0;
    var pp_openantrag_banner_apiUrl = "https://www.piratenpartei-hessen.de/node-jsonp-proxy/?url=http://www.openantrag.de/api/";
    
    var pp_openantrag_banner_links = new Array();
    pp_openantrag_banner_links[0] = "http://openantrag.de/";
    pp_openantrag_banner_links[1] = "http://openantrag.de/list";
    pp_openantrag_banner_links[2] = "http://openantrag.de/tags";
    pp_openantrag_banner_links[3] = "http://openantrag.de/api";
    pp_openantrag_banner_links[4] = "http://openantrag.de/feedback";

    var pp_openantrag_banner_texts = new Array();
    pp_openantrag_banner_texts[0] = "{x} Parlamente";
    pp_openantrag_banner_texts[1] = "{x} Anträge";
    pp_openantrag_banner_texts[2] = "{x} Themen";
    pp_openantrag_banner_texts[3] = "Viele Schnittstellen";
    pp_openantrag_banner_texts[4] = "Deine Verbesserungsidee";

    $("#pp_openantrag_banner_linkage").click(function() {
        window.open(pp_openantrag_banner_links[pp_openantrag_banner_current], '_blank');
    });

    function pp_openantrag_banner_updateSprite() {
        $("#pp_openantrag_banner_text").html(pp_openantrag_banner_texts[pp_openantrag_banner_current]);
        $('#pp_openantrag_banner_sprite').css('background-position-y', pp_openantrag_banner_current*-167+"px");
    }
    
    function pp_openantrag_banner_timerHandler() {
        pp_openantrag_banner_current++;
        if (pp_openantrag_banner_current > 4)
            pp_openantrag_banner_current = 0;
        pp_openantrag_banner_updateSprite();
    }

    function pp_openantrag_banner_startAnimation() {
        pp_openantrag_banner_updateSprite();
        pp_openantrag_banner_timer = window.setInterval(pp_openantrag_banner_timerHandler, 5000);
    }
    
    function pp_openantrag_banner_loadParlamente() {
        $.ajax({
            type: 'GET',
            url: pp_openantrag_banner_apiUrl + 'representation/GetKeyValueList&jsonp=parlamente',
            async: false,
            jsonpCallback: 'parlamente',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                pp_openantrag_banner_texts[0] = pp_openantrag_banner_texts[0].replace("{x}", json.length);
                pp_openantrag_banner_loadAntraege();
                pp_openantrag_banner_startAnimation();
            },
            error: function(e) {
               console.log(e.message);
            }
        });
    }

    function pp_openantrag_banner_loadAntraege() {
        $.ajax({
            type: 'GET',
            url: pp_openantrag_banner_apiUrl + 'proposal/all/GetCount&jsonp=antraege',
            async: false,
            jsonpCallback: 'antraege',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                pp_openantrag_banner_texts[1] = pp_openantrag_banner_texts[1].replace("{x}", json);
                pp_openantrag_banner_loadThemen();
            },
            error: function(e) {
               console.log(e.message);
            }
        });
    }
 
    function pp_openantrag_banner_loadThemen() {
        $.ajax({
            type: 'GET',
            url: pp_openantrag_banner_apiUrl + 'proposal/GetTags&jsonp=themen',
            async: false,
            jsonpCallback: 'themen',
            contentType: "application/json",
            dataType: 'jsonp',
            success: function(json) {
                pp_openantrag_banner_texts[2] = pp_openantrag_banner_texts[2].replace("{x}", json.length);
            },
            error: function(e) {
               console.log(e.message);
            }
        });
    }
    
    pp_openantrag_banner_loadParlamente();
});