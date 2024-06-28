! function(a) {
    a.fn.animatedHeadline = function(e) {
        function n(e) {
            e.each(function() {
                var e = a(this),
                    n = e.text().split(""),
                    s = e.hasClass("is-visible");
                for (i in n) e.parents(".rotate-2").length > 0 && (n[i] = "<em>" + n[i] + "</em>"), n[i] = s ? '<i class="in">' + n[i] + "</i>" : "<i>" + n[i] + "</i>";
                var t = n.join("");
                e.html(t).css("opacity", 1)
            })
        }

        function s(a) {
            var i = r(a);
            if (a.parents(".ah-headline").hasClass("type")) {
                var e = a.parent(".ah-words-wrapper");
                e.addClass("selected").removeClass("waiting"), setTimeout(function() {
                    e.removeClass("selected"), a.removeClass("is-visible").addClass("is-hidden").children("i").removeClass("in").addClass("out")
                }, h.selectionDuration), setTimeout(function() {
                    t(i, h.typeLettersDelay)
                }, h.typeAnimationDelay)
            } else if (a.parents(".ah-headline").hasClass("letters")) {
                var n = a.children("i").length >= i.children("i").length;
                l(a.find("i").eq(0), a, n, h.lettersDelay), o(i.find("i").eq(0), i, n, h.lettersDelay)
            } else a.parents(".ah-headline").hasClass("clip") ? a.parents(".ah-words-wrapper").animate({
                width: "2px"
            }, h.revealDuration, function() {
                d(a, i), t(i)
            }) : a.parents(".ah-headline").hasClass("loading-bar") ? (a.parents(".ah-words-wrapper").removeClass("is-loading"), d(a, i), setTimeout(function() {
                s(i)
            }, h.barAnimationDelay), setTimeout(function() {
                a.parents(".ah-words-wrapper").addClass("is-loading")
            }, h.barWaiting)) : (d(a, i), setTimeout(function() {
                s(i)
            }, h.animationDelay))
        }

        function t(a, i) {
            a.parents(".ah-headline").hasClass("type") ? (o(a.find("i").eq(0), a, !1, i), a.addClass("is-visible").removeClass("is-hidden")) : a.parents(".ah-headline").hasClass("clip") && a.parents(".ah-words-wrapper").animate({
                width: a.width() + 10
            }, h.revealDuration, function() {
                setTimeout(function() {
                    s(a)
                }, h.revealAnimationDelay)
            })
        }

        function l(i, e, n, t) {
            if (i.removeClass("in").addClass("out"), i.is(":last-child") ? n && setTimeout(function() {
                    s(r(e))
                }, h.animationDelay) : setTimeout(function() {
                    l(i.next(), e, n, t)
                }, t), i.is(":last-child") && a("html").hasClass("no-csstransitions")) {
                var o = r(e);
                d(e, o)
            }
        }

        function o(a, i, e, n) {
            a.addClass("in").removeClass("out"), a.is(":last-child") ? (i.parents(".ah-headline").hasClass("type") && setTimeout(function() {
                i.parents(".ah-words-wrapper").addClass("waiting")
            }, 200), e || setTimeout(function() {
                s(i)
            }, h.animationDelay)) : setTimeout(function() {
                o(a.next(), i, e, n)
            }, n)
        }

        function r(a) {
            return a.is(":last-child") ? a.parent().children().eq(0) : a.next()
        }

        function d(a, i) {
            a.removeClass("is-visible").addClass("is-hidden"), i.removeClass("is-hidden").addClass("is-visible")
        }
        var h = a.extend({
                animationType: "rotate-1",
                animationDelay: 2500,
                barAnimationDelay: 3800,
                barWaiting: 800,
                lettersDelay: 50,
                typeLettersDelay: 150,
                selectionDuration: 500,
                typeAnimationDelay: 1300,
                revealDuration: 600,
                revealAnimationDelay: 1500
            }, e),
            p = h.animationDelay;
        this.each(function() {
            var i = a(this);
            if (h.animationType && ("type" == h.animationType || "rotate-2" == h.animationType || "rotate-3" == h.animationType || "scale" == h.animationType ? i.find(".ah-headline").addClass("letters " + h.animationType) : "clip" == h.animationType ? i.find(".ah-headline").addClass(h.animationType + " is-full-width") : i.find(".ah-headline").addClass(h.animationType)), n(a(".ah-headline.letters").find("b")), i.hasClass("loading-bar")) p = h.barAnimationDelay, setTimeout(function() {
                i.find(".ah-words-wrapper").addClass("is-loading")
            }, h.barWaiting);
            else if (i.hasClass("clip")) {
                var e = i.find(".ah-words-wrapper"),
                    t = e.width() + 10;
                e.css("width", t)
            } else if (!i.find(".ah-headline").hasClass("type")) {
                var l = i.find(".ah-words-wrapper b"),
                    o = 0;
                l.each(function() {
                    var i = a(this).width();
                    i > o && (o = i)
                }), i.find(".ah-words-wrapper").css("width", o)
            }
            setTimeout(function() {
                s(i.find(".is-visible").eq(0))
            }, p)
        })
    }
}(jQuery);