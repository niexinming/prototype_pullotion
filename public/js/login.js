$(function(){

    $("#submit").click(function(){

        //接收数据格式为TEXT
        /*   $.ajax({
               type: "POST", /// 数据发送方式
               url: "login.action", // 后台处理程序
               dataType: "text", // 接收数据格式
               data: { // 要传递的数据
                   "user.username": $("#username").val(),
                   "user.password": $("#password").val()
               },
               error: function(){//请求失败时调用函数。
                   $("#msg").html("请求失败!");
               },
               success: function(data){ //请求成功后回调函数。
                   alert(data);
                   var obj = eval("(" + data + ")");//转换为json对象
                   $("#msg").html(obj.message);
               }

           });
           */
        //接收数据格式为JSON
        $.ajax({
            type: "POST", /// 数据发送方式
            url: "/", // 后台处理程序
            dataType: "json", // 接收数据格式
            contentType:'application/json;charset=UTF-8',
            data: JSON.stringify({ // 要传递的数据
                "user": $("#username").val(),
                "passwd": $("#password").val()
            }),
            error: function(){//请求失败时调用函数。
                $("#msg").html("请求失败!");
            },
            success: function(data){ //请求成功后回调函数。
                alert(data.msg);  //如果接收数据dataType的值为“json”，就不用对返回值进行eval()处理了，因为它已经是json格式的了
                $("#msg").html(data.message).css("color","black");
                // $("#msg").html(data.user.username+"-->"+data.user.password);
            }

        });

    })})