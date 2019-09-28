// 封装动画函数
// obj目标对象 target目标位置(移动距离) callback动画结束回调
// function animate(obj,target,callback){
//     // 清除上一次的定时器
//     clearTimeout(obj.timer)
//     obj.timer = setInterval(function(){
//         if(obj.offset>= target){
//             clearTimeout(obj.timer)
//             // 动画结束回调
//             if(callback){
//                 callback()
//             }
//         }
//         obj.style.left = obj.offsetLeft + 1 + 'px'
//     },15)
// }

// 缓动效果
function animate(obj,target,callback){
    // 清除上一次的定时器
    clearTimeout(obj.timer)
    obj.timer = setInterval(function(){
        // 步长（设置为整数，不出现小数）
        //var step = Math.ceil((target- obj.offsetLeft)/10)
        var step  = (target- obj.offsetLeft)/10
        step = step >0 ?Math.ceil(step) : Math.floor(step)
        if(obj.offset== target){
            // 停止动画
            clearTimeout(obj.timer)
            // 动画结束回调
            // if(callback){
            //     callback()
            // }
            callback && callback()
        }
        // 将每次加1的步长值改为一个慢慢变小的值， 步长公式：（目标值-现在位置）/10
        obj.style.left = obj.offsetLeft + step + 'px'
    },15)
}