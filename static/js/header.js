$(function () {
    $('#button-nav-var-js').on('click', function () {        // js-btnクラスをクリックすると、
        $(this).toggleClass('active');
        $('.menu-nav-bar').toggleClass('open'); // メニューとバーガーの線にopenクラスをつけ外しする
    })
});