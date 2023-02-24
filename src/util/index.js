import { computed } from "vue";
function changeCount(num) {
    if (num > 100000000) {
      return (num / 100000000).toFixed(1) + "亿";
    } else if (num >= 10000) {
      return (num / 10000).toFixed(1) + "万";
    }
  }
//   将计算属性引入，可直接调用方法
// 限制字符长度
  const sliceStr = computed(() => {
    return function (val, len) {
      return val.length > len ? val.slice(0, len) + "..." : val;
    };
  });
export {changeCount,sliceStr }