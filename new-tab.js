
function getImg() {
    let gPath = [];
    let path = [
        '/img/bg/01.png',
        '/img/bg/02.png',
        '/img/bg/03.png',
        '/img/bg/04.png',
        '/img/bg/05.png',
        '/img/bg/06.png',
        '/img/bg/07.png',
        '/img/bg/08.png',
        '/img/bg/09.png',
        '/img/bg/10.png',
        '/img/bg/11.png',
        '/img/bg/12.png',
        '/img/bg/13.png',
        '/img/bg/14.png',
        '/img/bg/15.png',
        '/img/bg/16.png',
        '/img/bg/17.png',
        '/img/bg/18.png',
        '/img/bg/19.png',
        '/img/bg/20.png'
    ];
    let reader = new FileReader();
    path.forEach(e => {
        gPath.push(chrome.extension.getURL(e));
    })
    let idx = Math.floor(Math.random() * gPath.length);
    $('body').css('opacity', 0)
    $('.bg').css('background-image', 'url(' + gPath[idx] + ')');
    $('body').animate({ 'opacity': 1 }, 800)
}

function getTime() {
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    if (m / 10 < 1) {
        m = '0'.concat(m)
    }
    $('.time')[0].innerText = `${h}:${m}`;
    setTimeout(function () {
        getTime();
    }, 1000)
}

function render(e) { //初始化

    let template = `
    <div class="labl" id=label${e.id}>
        <a href='${e.link}'>
            <span class='lpic' style="background-image: url(${e.url})"></span>
            <p class="lname">${e.name}</p>
        </a>
    </div>`;
    $('#sortable').append(template);

}


function dragger() {

    $("#sortable").sortable({ revert: true });
    $("#sortable").disableSelection();


}
let labels = [ //标签数组
    {
        id: 1,
        link: 'https://bilibili.com', //跳转链接
        url: './img/icon/bilibili.png', //图片路径
        name: 'bilibili', 
    },
    {
        id: 2,
        link: 'https://outlook.live.com/mail/inbox', //跳转链接
        url: './img/icon/outlook.png', //图片路径
        name: 'Outlook', 
    },
    {
        id: 3,
        link: 'https://www.instagram.com', //跳转链接
        url: './img/icon/ins.jpg',
        name: 'instargram', 
    },
    {
        id: 5,
        link: 'https://www.facebook.com/',
        url: './img/icon/fb.png',
        name: 'Facebook'
    },
    {
        id: 6,
        link: 'https://twitter.com/',
        url: './img/icon/twitter.jpg',
        name: 'Twitter'
    },
    {
        id: 7,
        link: 'https://www.youtube.com/',
        url: './img/icon/youtube.png',
        name: 'Youtube'
    },
    {
        id: 8,
        link: 'https://segmentfault.com/',
        url: './img/icon/sf.jpg',
        name: 'Segmentfault'
    },
    {
        id: 9,
        link: 'https://github.com/',
        url: './img/icon/github.jpg',
        name: 'Github'
    },
    {
        id: 10,
        link: 'https://sulpures.com/#/',
        url: './img/icon/saan.png',
        name: 'Caster'
    },
    {
        id: 11,
        link: 'https://juejin.im/timeline',
        url: './img/icon/juejin.svg',
        name: '掘金'
    },
    {
        id: 12,
        link: 'https://note.youdao.com/web/',
        url: './img/icon/youdao.png',
        name: '有道云笔记'
    },
    {
        id: 13,
        link: 'https://www.zhihu.com/follow',
        url: './img/icon/zhihu.png',
        name: '知乎'
    },
    {
        id: 14,
        link: 'https://www.pixiv.net/',
        url: './img/icon/p.png',
        name: 'Pixiv'
    },
];

getImg();//刷新变背景
getTime();//拿时间
labels.forEach(e => {
    render(e);
})
dragger();//拖拽相关