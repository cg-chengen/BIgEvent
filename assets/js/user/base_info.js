// 基础资料功能
$(function() {
    const { layer, form } = layui

    function initUserInfo() {
        axios.get('/my/userinfo').then(res => {

            if (res.status != 0) {
                return layer.msg = ('获取失败')
            }
            console.log(res.data);
            const { data } = res;
            form.val('edit-userinfo', data)
        })
    }

    initUserInfo()

    form.verify({
        nick: [
            /^\S{1,6}/,
            '昵称字符必须在1~6个字符之间'
        ]

    })

    $('.base-info-form').submit(function(e) {
        e.preventDefault();
        axios.post('/my/userinfo', $(this).serialize()).then(res => {
            console.log(res);
            if (res.status != 0) {
                return layer.msg('修改信息失败');
            }
            layer.msg('修改信息成功');
            window.parent.getUserInfo()
        })
    })
    $('#reset_button').click(function(e) {
        e.preventDefault()
        initUserInfo()
    })

})