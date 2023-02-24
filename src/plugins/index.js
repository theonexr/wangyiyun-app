// 引入组件
import { Button,Swipe, SwipeItem,Popup  } from 'vant';
// 放入数组
let plugins = [
    Button,Swipe, SwipeItem,Popup 
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}