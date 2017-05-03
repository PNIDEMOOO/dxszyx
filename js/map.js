/**
 * Created by ZHY on 2017/5/2.
 */

//地图初始化
var opts = {
    width: 200,     // 信息窗口宽度
//        height: 80,     // 信息窗口高度
//        title: "信息窗口", // 信息窗口标题
    enableMessage: true//设置允许信息窗发送短息
};

var sContent = '';
var pointArray = new Array();
var map = new BMap.Map("map");
map.centerAndZoom(new BMap.Point(121.4705,31.245488), 12);
map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
map.setCurrentCity("上海");          // 设置地图显示的城市 此项是必须设置的
map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放

// //单击获取点击的经纬度
// map.addEventListener("click", function (e) {
//     alert(e.point.lng + "," + e.point.lat);
// });

$.ajax({
    type: "get",
    url: "data.json",
    success: function (result) {
        var data = eval(result);
        for (var i = 0; i < data.length; i++) {
            var marker = new BMap.Marker(new BMap.Point(data[i].lon, data[i].lat)); // 创建点
            marker.setZIndex(20000000);
            pointArray[i] = new BMap.Point(data[i].lon, data[i].lat);

            map.addOverlay(marker);    //增加点
            var opts1 = {
                position: pointArray[i],    // 指定文本标注所在的地理位置
                offset: new BMap.Size(-20, -50)    //设置文本偏移量
            }
            var str = data[i].name;
            var label = new BMap.Label(str, opts1);  // 创建文本标注对象
            label.setStyle({
                // color: "white",
                fontSize: "16px",
                height: "20px",
                lineHeight: "20px",
                fontFamily: "微软雅黑",
                // backgroundColor:"black",
                border: "none",
            });
            map.addOverlay(label);
            sContent =
                "<h4 class='SchoolName' style='margin:0 0 5px 0;padding:0.2em 0'>" + data[i].name +
                "</h4>" +
                "<a class='SchoolURL' target='_blank' href='" + data[i].url +
                "'>校园攻略</a>" +
                "</div>";
            addClickHandler(sContent, marker);
        }
    }
});

function addClickHandler(content, marker) {
    marker.addEventListener("click", function (e) {
            openInfo(content, e)
        }
    );
}

function openInfo(content, e) {
    var p = e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
    var infoWindow = new BMap.InfoWindow(content, opts);  // 创建信息窗口对象
    map.openInfoWindow(infoWindow, point); //开启信息窗口
}

