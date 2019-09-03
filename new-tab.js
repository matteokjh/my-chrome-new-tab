
function getImg() {
    let gPath = [];
    let pathString = '01.png,02.png,03.png,04.png,05.png,06.png,07.png,08.png,09.png,10.png,11.png,12.png,13.png,14.png,15.png,16.png,17.png,18.png,19.png,20.png,54156275_p0.png,57570276_p0_master1200.jpg,59665299_p0.jpg,63534764_p0_master1200.jpg,63740442_p0.png,65105861_p0_master1200.jpg,67312373_p0_master1200.jpg,67609413_p0_master1200.jpg,69553946_p0_master1200.jpg,70876558_p0_master1200.jpg,72189536_p1.png,72379562_p1_master1200.jpg,72665414_p0_master1200.jpg,73242214_p0_master1200.jpg,73694456_p0_master1200.jpg,73755434_p0_master1200.jpg,73858612_p0_master1200.jpg,74078288_p0.png,74099987_p0.png,asakusa_backstreets_by_pajunen_dd2wq5y-pre.jpg,asakusa_streets_by_pajunen_d6qgyva-fullview.jpg,微信图片_20190818171740.jpg'
    let path = pathString.split(',');
    path.forEach(e => {
        gPath.push(chrome.extension.getURL('/img/bg/' + e));
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
    <div class="labl" id=${e.name}>
        <a href='${e.link}'>
            <span class='lpic' style="background-image: url(${e.url})"></span>
            <p class="lname">${e.name}</p>
        </a>
    </div>`;
    $('#sortable').append(template);

}


function dragger() {

    $("#sortable").sortable({
        revert: true,
        stop: function () {
            let children = $('#sortable').children();
            let res = [];
            let k = new Map();
            [...children].forEach((e, idx) => {
                res.push(e.innerText)
                k.set(e.innerText, idx)
            })
            labels.sort((a, b) => {
                return k.get(a.name) - k.get(b.name)
            })
            // 保存状态，拿来做位置改动
            chrome.storage.sync.set({
                order: labels
            })
        }
    });



}
let labels = [ //标签初始数组
    {
        link: 'https://bilibili.com', //跳转链接
        url: './img/icon/bilibili.png', //图片路径
        name: 'bilibili',
    },
    {
        link: 'https://outlook.live.com/mail/inbox', //跳转链接
        url: './img/icon/outlook.png', //图片路径
        name: 'Outlook',
    },
    {
        link: 'https://www.instagram.com', //跳转链接
        url: './img/icon/ins.jpg',
        name: 'instargram',
    },
    {
        link: 'https://www.facebook.com/',
        url: './img/icon/fb.png',
        name: 'Facebook'
    },
    {
        link: 'https://twitter.com/',
        url: './img/icon/twitter.jpg',
        name: 'Twitter'
    },
    {
        link: 'https://www.youtube.com/',
        url: './img/icon/youtube.png',
        name: 'Youtube'
    },
    {
        link: 'https://segmentfault.com/',
        url: './img/icon/sf.jpg',
        name: 'Segmentfault'
    },
    {
        link: 'https://github.com/',
        url: './img/icon/github.jpg',
        name: 'Github'
    },
    {
        link: 'https://sulpures.com/#/',
        url: './img/icon/saan.png',
        name: 'Caster'
    },
    {
        link: 'https://juejin.im/timeline',
        url: './img/icon/juejin.svg',
        name: '掘金'
    },
    {
        link: 'https://note.youdao.com/web/',
        url: './img/icon/youdao.png',
        name: '有道云笔记'
    },
    {
        link: 'https://www.zhihu.com/follow',
        url: './img/icon/zhihu.png',
        name: '知乎'
    },
    {
        link: 'https://www.pixiv.net/',
        url: './img/icon/p.png',
        name: 'Pixiv'
    },
    {
        link: 'https://leetcode-cn.com/',
        url: './img/icon/leetcode.png',
        name: 'Leetcode'
    },
];



getImg();// 刷新变背景
getTime();// 拿时间

chrome.storage.sync.get(['order'], res => {// 拿顺序，并渲染
    if (res.order && res.order.length == labels.length) { // 如果有增减标签，长度会不等
        res.order.forEach(e => {
            render(e);
        })
    } else {
        labels.forEach(e => {
            render(e);
        })
    }
})

dragger();// 拖拽相关

let show = true;
$('.focus').click(function(){ // 专注模式相关
    if(show){
        $('#sortable').fadeOut();
        $('.search-bar').fadeOut();
        $('.time').hide();
        $('.time').addClass('bigTime');
        $('.time').fadeIn();
        $('.focus').children('p')[0].innerText = '普通模式'
        show = false;
    }else{  
        $('#sortable').fadeIn();
        $('.search-bar').fadeIn();
        $('.time').hide();
        $('.time').removeClass('bigTime');
        $('.time').fadeIn();
        $('.focus').children('p')[0].innerText = '专注模式'
        show = true;
    }
})

// $('.pomodoro').click(function(){
//     if(show){
//         $('#sortable').fadeOut();
//         $('.search-bar').fadeOut();
//         $('.time').fadeOut();
//         $('.p-timer').fadeIn();
//         show = false;
//     }else{
//         $('#sortable').fadeIn();
//         $('.search-bar').fadeIn();
//         $('.time').fadeIn();
//         $('.p-timer').fadeOut();
//         show = true;
//     }
//     chrome.storage.sync.get(['pomodoro'],function(res){
//         if(!res.status){
//             clockSetter();
//         }
//     })
//     console.warn('set clock');
// })

// function clockSetter(){

// }