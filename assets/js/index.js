//提取layui模块
const { layer } = layui
// 获取用户个人信息
function getUserInfo() {
    axios.get('/my/userinfo').then(res => {
        console.log(res);
        if (res.status != 0) {
            return layer.msg('获取数据失败')
        };
        // 提取res模块
        const { data } = res;
        const name = data.nickname || data.username
            // 渲染昵称
        $('.nickname').text(`欢迎${name}`)
            //渲染头像
        if (data.user_pic) {
            $('.avatar').prop('src', data.user_pic);
            $('.avatar').show()
            $('.nickname').show()
            $('.avatar_user').hide()
        } else {
            $('.avatar_user').text(name[0].toUpperCase())
            $('.avatar_user').show()
            $('.nickname').show()
            $('.avatar').hide()
        }
    })
}
getUserInfo()



$('.loginout').click(function() {
    localStorage.removeItem('token');
    location.href = './login.html'
})