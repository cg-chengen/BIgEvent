$(function() {
    state = ''
    const { form } = layui;
    // 渲染
    getCateList();

    function getCateList() {
        // 从服务器获取数据
        axios.get('/my/article/cates').then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败!')
            };
            res.data.forEach(item => {
                $('.cate_sel').append(`
                <option value="${item.Id}">${item.name}</option>
                `);
            });
            form.render('select');
        })
    }
    initEditor()
        // 1. 初始化图片裁剪器
    var $img = $('#image')

    // 2. 裁剪选项
    $img.cropper({
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    });
    // 选择封面
    $('.choose_btn').click(function() {
        $('#file').click()
    })
    $('#file').change(function() {
        const imgUrl = URL.createObjectURL(this.files[0]);
        $img.cropper('replace', imgUrl);
    })
    $('.publish_form').submit(function(e) {
        e.preventDefault();
        // debugger;
        const fd = new FormData(this);
        fd.forEach(item => {
            console.log(item);
        });
        // 向fd新增state属性(click快于提交)
        fd.append('state', state);
        $img.cropper('getCroppedCanvas', {
            width: 400,
            hight: 200
        }).toBlob(blob => {
            fd.append('cover_img', blob);
            publishArticle(fd)
        })

    })

    $('.last_btn').click(function() {
        state = $(this).data('state')
    })

    function publishArticle(fd) {
        axios.post('/my/article/add', fd).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('发布失败!')
            }
            layer.msg(state == '草稿' ? '保存草稿成功!' : '发布文章成功!');
            // 跳转页面
            location.href = './list.html';
            // window.parent.$('.layui-this').prev().addClass('layui-this').siblings().remove('layui-this  ')
            // 触发点击事件,高亮显示
            window.parent.$('.layui-this').prev().find('a').click();
        })
    }
})