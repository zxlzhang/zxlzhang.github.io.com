import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

interface UrEditorProps {
  handleEditorChange: Function;
  content: String;
  ref: String;
}

const actionImgUrl = 'https://wfplwim6-jiaji.mock.coding.io/api/admin/media/upload';

const UrEditor = (UrEditorProps: any) => {
  const { handleEditorChange, content } = UrEditorProps;
  const editorObj = {
    selector: '#tinydemo2',
    //skin:'oxide-dark',
    language: 'zh_CN',
    plugins:
      //   lineheight formatpainter axupimgs bdmap indent2em
      'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help emoticons autosave autoresize',
    toolbar:
      'code undo redo restoredraft | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | \
    styleselect formatselect fontselect fontsizeselect | bullist numlist | blockquote subscript superscript removeformat | \
    table image media charmap emoticons hr pagebreak insertdatetime print preview | fullscreen | bdmap indent2em lineheight formatpainter axupimgs',
    height: 650, //编辑器高度
    min_height: 400,
    /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
        '/static/reset.css',
        '/static/ax.css',
        '/static/css.css',
    ],*/
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    link_list: [
      { title: '预置链接1', value: 'http://www.tinymce.com' },
      { title: '预置链接2', value: 'http://tinymce.ax-z.cn' },
    ],
    // image_list: [
    //   { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
    //   { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' },
    // ],
    // image_class_list: [
    //   { title: 'None', value: '' },
    //   { title: 'Some class', value: 'class-name' },
    // ],
    importcss_append: true,
    // images_upload_url: actionImgUrl,
    // images_upload_base_path: '/api',
    images_upload_handler: function (blobInfo: any, succFun: any, failFun: any) {
      var xhr: any, formData;
      var file = blobInfo.blob(); //转化为易于理解的file对象
      xhr = new XMLHttpRequest();
      xhr.withCredentials = false;
      xhr.open('POST', actionImgUrl);
      xhr.onload = function () {
        var json;
        if (xhr.status != 200) {
          failFun('HTTP Error: ' + xhr.status);
          return;
        }
        json = JSON.parse(xhr.responseText);
        if (!json || typeof json.location != 'string') {
          failFun('Invalid JSON: ' + xhr.responseText);
          return;
        }
        succFun(json.location);
      };
      formData = new FormData();
      formData.append('file', file, file.name); //此处与源文档不一样
      xhr.send(formData);
    },
    // 自定义文件选择器的回调内容
    file_picker_callback: function (callback: any, value: any, meta: any) {
      if (meta.filetype === 'file') {
        callback('https://www.baidu.com/img/bd_logo1.png', { text: 'My text' });
      }
      if (meta.filetype === 'image') {
        callback('https://www.baidu.com/img/bd_logo1.png', { alt: 'My alt text' });
      }
      if (meta.filetype === 'media') {
        callback('movie.mp4', {
          source2: 'alt.ogg',
          poster: 'https://www.baidu.com/img/bd_logo1.png',
        });
      }
    },

    autosave_ask_before_unload: false,
  };

  console.log(this);

  return (
    <Editor
      inline={false}
      //   selector="editorStateRef" // 选择器
      // ref={ref}
      initialValue={content}
      apiKey="官网上申请的key值"
      //   initialValue={editorState}
      init={{ ...editorObj }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default UrEditor;
