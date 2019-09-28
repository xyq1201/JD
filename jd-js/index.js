window.onload = function () {

    // 顶部导航
    var shortcutList = document.querySelector('.company')
    var dropDown = document.querySelector('.dropDown')
    shortcutList.addEventListener('mousemove', function () {
        this.className = 'company company_mouseMove'
        dropDown.style.display = 'block'
    })
    shortcutList.addEventListener('mouseout', function () {
        this.className = 'company'
        dropDown.style.display = 'none'

    })

    // 窗口宽度变化，隐藏内容
    var sliderRecommendWrapper = document.querySelector('.sliderRecommendWrapper')
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 1200) {
            sliderRecommendWrapper.style.display = 'none'
        } else {
            sliderRecommendWrapper.style.display = 'block'
        }
    })

    // 轮播图
    // 1.轮播图显示区域ul
    var sliderWrapper = document.querySelector('.slider_wrapper')

    // 箭头显示隐藏
    // 获取两个箭头
    var arrowL = document.querySelector('.arrow_l')
    var arrowR = document.querySelector('.arrow_r')
    // 当鼠标移入
    sliderWrapper.addEventListener('mousemove', function () {
        // 通过修改元素样式style，显示
        arrowL.style.display = 'block'
        arrowR.style.display = 'block'
        // 关闭定时器
        clearTimeout(timer)
        //清除定时器变量
        timer = null
    })
    // 当鼠标移出
    sliderWrapper.addEventListener('mouseout', function () {
        // 通过修改元素样式style，隐藏
        arrowL.style.display = 'block'
        arrowR.style.display = 'block'
        //开启定时器
        timer = setInterval(function(){
            // 手动调用点击事件
            arrowR.click()
        },2000)
    })
    // 动态生成小圆圈个数+为小圆圈绑定点击事件，更改样式
    // 获取图片个数
    // var imgS = document.querySelectorAll('.slider_item')
    // 也可通过父元素slider_wrapper获取
    var imgS = document.querySelectorAll('.slider_item')
    // console.log(imgS.length)
    // 图片宽度
    var imgWidth = imgS[0].offsetWidth
    // console.log(imgWidth)
    //2.获取索引循环ul
    var circleList = document.querySelector('.circle')
    // 3.循环遍历
    for (var i = 0; i < imgS.length; i++) {
        // 创建Li
        var li = document.createElement('li')
        // 记录当前li索引号，通过自定义属性
        li.setAttribute('index', i)
        // 将li添加到ul中
        circleList.appendChild(li)
        // 4.绑定点击事件
        li.addEventListener('click', function () {
            // 遍历生成的所有小圆圈，设置选中样式（排他思想）
            for (var i = 0; i < circleList.children.length; i++) {
                //干掉所有人
                circleList.children[i].className = ''
            }
            // 留下自己
            this.className = 'current'

            // 5.点击索引移动图片
            // 点击索引，拿到索引号
            var index = this.getAttribute('index')
            // 当点击li时，需要把li的索引号给num
            num = index
            //当点击li时，需要把li的索引号给circle
            circle = index
            console.log(index)
            // 移动距离：小圆圈索引号 乘以 图片的宽度（负值）
            // obj--sliderWrapper;
            //target--index*imgWidth
            //animate(obj,target)
            animate(sliderWrapper, -index * imgWidth)
        })

    }
    // 将第一个类名设置为current
    circleList.children[0].className = 'current'

    //6.克隆做第一张图片放在ul最后,true浅克隆
    var first = sliderWrapper.children[0].cloneNode(true)
    sliderWrapper.appendChild(first)
    // 7.点击右侧按钮，图片滚动一张
    var num = 0
    // 控制小圆圈的播放
    var circle = 0
    //节流阀flag
    // var flag = true
    arrowR.addEventListener('click', function () {
        // if(flag){
            // 关闭节流阀
            // flag = false;
        // 走到最后一张，此时，ul快速复原,left为0
        if (num == sliderWrapper.children.length - 1) {
            sliderWrapper.style.left = 0
            num = 0
        }
        num++
        animate(sliderWrapper, -num * imgWidth,function(){
            // 打开节流阀
            flag = true;
        })
        // 8.点击右侧按钮，小圆圈跟随一起变化，可以在声明一个变量控制小圆圈的播放
        circle++
        //如果circle = 5,说明走到我们最后克隆的图片,就复原
        if (circle == circleList.children.length) {
            circle = 0
        }
        // 调用函数
        circleChange()
        // }

    })
    //9.左侧按钮
    arrowL.addEventListener('click', function () {
    //   if(flag){
    //       flag = false;
            // 走到最后一张，此时，ul快速复原,left为0
        if (num == 0) {
            sliderWrapper.style.left = -(sliderWrapper.children.length - 1) * imgWidth+'px'
            num = sliderWrapper.children.length - 1
        }
        // 反向
        num--
        animate(sliderWrapper, -num * imgWidth,function(){
            flag = true
        })
        // 8.点击左侧按钮，小圆圈跟随一起变化，可以在声明一个变量控制小圆圈的播放
        circle--
        //如果circle < 0,说明为第一张图片，则小圆圈改为第5个小圆圈（索引号为4）
        if (circle < 0) {
            circle = circleList.children.length - 1
        }
        // 调用函数
        circleChange()
    //   }
    })
    // 索引更改封装
    function circleChange() {
        //先清除其余小圆圈的current类名
        for (var i = 0; i < circleList.children.length; i++) {
            circleList.children[i].className = ''
        }
        //留下当前小圆圈的current类名
        circleList.children[circle].className = 'current'
    }
    // 10.定时器。自动播放
    var timer = setInterval(function(){
        // 手动调用点击事件
        arrowR.click()
    },2000)




    // 秒杀倒计时
    // 获取标签
    let unitHour = document.querySelector(".timmer__unit--hour")
    let unitMinute = document.querySelector(".timmer__unit--minute")
    let unitSecond = document.querySelector(".timmer__unit--second")
    // 用户输入事件
    let endTime = +new this.Date('2019-10-31 23:59:59')
    // 先调用一次函数，防止第一次刷新时页面空白
    countDown()
    // 采用定时器,1s更改一次
    setInterval(countDown, 1000)
    // 秒杀倒计时
    function countDown() {
        // 当前时间（毫秒数）
        let nowTime = +new Date()
        // 截至时间(用户输入时间)（毫秒数）
        // let endTime = +new Date(time)
        // 剩余时间(秒)
        // let times = (endTime - nowTime) / 1000
        let times = (endTime - nowTime) / 1000
        // 剩余天
        let d = parseInt(times / 60 / 60 / 24)
        d = d < 10 ? "0" + d : d
        // 剩余小时
        let h = parseInt(times / 60 / 60 % 24)
        h = h < 10 ? "0" + h : h
        unitHour.innerHTML = h
        // 剩余分钟
        let ms = parseInt(times / 60 % 60)
        ms = ms < 10 ? "0" + ms : ms
        unitMinute.innerHTML = ms
        // 剩余秒
        let s = parseInt(times % 60)
        s = s < 10 ? "0" + s : s
        unitSecond.innerHTML = s
        // 返回
        // return d+'天'+h+'时'+ms+'分'+s+'天秒'
        // return {d,h,ms,s}
    }


    // 侧边栏的滚动固定
    // 获取秒杀栏，侧边栏，以及返回顶部元素
    var secKillInner = document.querySelector('.secKill_inner')
    var elevator = document.querySelector('.elevator')
    var elevatorToTop = document.querySelector('.elevator_toTop')
    var elevatorTxts = document.querySelectorAll('.elevator_lk_txt')
    console.log(elevatorTxts)
    console.log(secKillInner.offsetTop)
    // 为window绑定scroll事件
    document.addEventListener('scroll', function () {
        // 当顶部卷入距离超过秒杀栏距离文档顶部的距离时
        if (window.pageYOffset >= secKillInner.offsetTop) {
            // 侧边栏固定，返回顶部元素显示
            elevator.style.position = 'fixed'
            elevator.style.top = 75 + 'px'
            elevatorToTop.style.display = 'block'
        } else {
            elevator.style.position = 'absolute'
            elevator.style.top = 0 + 'px'
            elevatorToTop.style.display = 'none'
        }
        // 更改侧边导航文字颜色
        if (window.pageYOffset >= secKillInner.offsetTop && window.pageYOffset < secKillInner.offsetTop + 300) {
            elevatorTxts[0].style.color = '#f10215'
        } else if (window.pageYOffset >= secKillInner.offsetTop + 300 && window.pageYOffset < secKillInner.offsetTop + 600) {
            elevatorTxts[1].style.color = '#f10215'
            elevatorTxts[0].style.color = '#333'
        } else {
            elevatorTxts[1].style.color = '#333'
        }
    })


    // 点击回到的顶部
    elevatorToTop.addEventListener('click',function(){
        // 太快
        // window.scroll(0,0)
        // 缓慢
        // obj--window
        //target--0
        animateToTop(window,0)
    })
    function animateToTop(obj,target,callback){
        // 清除上一次的定时器
        clearTimeout(obj.timer)
        obj.timer = setInterval(function(){
            // 步长（设置为整数，不出现小数）
            //var step = Math.ceil((target- obj.offsetLeft)/10)
            var step  = (target- window.pageYOffset)/10
            step = step >0 ?Math.ceil(step) : Math.floor(step)
            if(window.pageYOffset== target){
                // 停止动画
                clearTimeout(obj.timer)
                // 动画结束回调
                // if(callback){
                //     callback()
                // }
                callback && callback()
            }
            // 将每次加1的步长值改为一个慢慢变小的值， 步长公式：（目标值-现在位置）/10
            // obj.style.left = obj.offsetLeft + step + 'px'
            // 不加单位
            window.scroll(0,window.pageYOffset+ step)
        },15)
    }



    // 商品nav点击更改样式
    var tabNav = document.querySelectorAll('.feeds-tab>li')
    console.log(tabNav[0])
    // 默认状态下，第一个样式
    var index = 0
    tabNav[index].className = 'feed-tab__item--active'

    for (var i = 0; i < tabNav.length; i++) {
        tabNav[i].onclick = function () {
            // 先清除所有的设置
            for (var i = 0; i < tabNav.length; i++) {
                tabNav[i].className = ''
            }
            // 当前点击的li进行设置
            this.className = 'feed-tab__item--active'
        }

    }



}