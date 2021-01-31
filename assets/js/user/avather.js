$(function() {
    var $img = $('#image')

    $img.cropper({
        aspectRation: 1,
        crop: function(e) {
            console.log(e.detail.x);
            console.log(e.detail.y);
        },
        preview: '.img-preview'
    })

    // 点击上传按钮,上传文件
    $('#upload_btn').click(function() {
        $('#file').click()
    });
    // 监听文件框选择事件
    $('#file').change(function() {
        console.log($(this).files);
        if (this.files.length == 0) {
            return
        }
        // 把文件转化为地址
        const imgUrl = URL.createObjectURL(this.files[0]);
        // 替换图片
        $img.cropper('replace', imgUrl)
    });
    // 监听文件框保存事件
    $('#save_btn').click(function() {
        // 获取剪裁后图片base64格式
        const dataurl = $img.cropper('getCroppedCanvas', {
            width: 100,
            hight: 100
        }).toDataURL('img/jpeg');
        // console.log(dataurl);
        // 手动构建查询参数
        const search = new URLSearchParams();
        search.append('avatar', dataurl);
        // 发送服务器请求
        axios.post('/my/update/avatar', search).then(res => {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('上传失败')
            }
            layer.msg('上传成功');
            window.parent.getUserInfo()
        });



    })











})