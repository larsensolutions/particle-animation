module.exports = {
    bool(){
        return Math.random() < 0.5;
      },
    plusMinus(){
        return Math.random() < 0.5 ? -1 : 1;
    },
    range(min, max) {
        return Math.random() * (max - min) + min;
    },
    item(list){
        var index = Math.round(this.range(0,list.length));
        if(index==list.length){
            index--;
        }
        return list[index];
    }
}