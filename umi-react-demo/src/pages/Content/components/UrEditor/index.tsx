import React from 'react';
import { Editor } from '@tinymce/tinymce-react';
import config from '../../../../config';
import axios from 'axios';

interface UrEditorProps {
  handleEditorChange: Function;
  content: String;
  id: String;
}

const actionImgUrl = config.actionImgUrl;

const UrEditor = (UrEditorProps: any) => {
  const { handleEditorChange, content, id } = UrEditorProps;
  const plugins: Array<string> = [
    'print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount imagetools textpattern help paste emoticons autosave',
  ];
  const toolbar: Array<string> = [
    'code codesample undo redo restoredraft | cut copy paste pastetext | forecolor backcolor searchreplace bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent | bullist numlist | formatselect fontselect fontsizeselect | blockquote subscript superscript removeformat | table image media charmap emoticons hr pagebreak insertdatetime print preview',
  ];
  const editorObj: any = {
    selector: '#tinydemo2',
    //skin:'oxide-dark',
    language: 'zh_CN',
    plugins: plugins,
    toolbar: toolbar,
    height: 650, //编辑器高度
    min_height: 400,
    fontsize_formats: '12px 14px 16px 18px 24px 36px 48px 56px 72px',
    font_formats:
      '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
    link_list: [
      { title: '预置链接1', value: 'http://www.tinymce.com' },
      { title: '预置链接2', value: 'http://tinymce.ax-z.cn' },
    ],
    menubar: menubar,
    end_container_on_empty_block: true, //
    // powerpaste_word_import: 'clean', //
    advlist_bullet_styles: 'square', //
    advlist_number_styles: 'default', //
    imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'], //
    default_link_target: '_blank', //
    link_title: false, //
    nonbreaking_force_tab: true, // inserting nonbreaking space &nbsp; need Nonbreaking Space Plugin
    init_instance_callback: (editor: any) => {
      if (content) {
        editor.setContent(content);
      }
      editor.on('NodeChange Change KeyUp SetContent', () => {});
    },
    setup(editor: any) {
      editor.on('FullscreenStateChanged', (e: any) => {});
    },
    powerpaste_word_import: 'propmt', //
    powerpaste_html_import: 'propmt', //
    powerpaste_allow_local_images: true, //
    // paste_data_images: true,
    convert_urls: false, //这个参数加上去就可以了
    file_picker_types: 'media', //
    forced_root_block: 'p', //
    force_p_newlines: true, //
    content_style: 'edit-contain', //
    insert_button_items: 'image', //
    paste_retain_style_properties: 'all', //
    paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
    paste_convert_word_fake_lists: false, // 插入word文档需要该属性
    paste_webkit_styles: 'all', //此选项允许您指定在WebKit中粘贴时要保留的样式
    paste_merge_formats: true, //此选项启用粘贴插件的合并格式功能
    paste_auto_cleanup_on_paste: false, //
    file_brower_callback_type: 'media', // 此选项允许您使用空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
    // file_picker_types: 'media', // 此选项允许您通过空格或逗号分隔的类型名称列表指定所需的文件选取器类型。目前有三种有效类型：文件、图像和媒体
    // font_formats: font_formats,
    // Tab 此选项允许您指定当用户在编辑器中按tab键时要聚焦的元素ID,您也可以使用特殊的“：prev”和“：next”值。然后将焦点放在DOM中TinyMCE实例之前/之后的上一个或下一个输入元素上。
    tabfocus_elements: ':prev,:next', //
    imagetools_toolbar: 'editimage', // 图片控制的工具栏
    importcss_append: true,
    images_upload_handler: function (blobInfo: any, succFun: any, failFun: any) {
      var CancelToken = axios.CancelToken;
      var formData = new FormData();
      var file = blobInfo.blob();
      // formData.append('file', file.file);
      formData.append('file', file, file.name);
      axios({
        timeout: 1000 * 60,
        url: config.actionImgUrl,
        method: 'POST',
        data: formData,
        cancelToken: new CancelToken((c) => {
          //行中断请求
          file.cancel = c;
        }),
        onUploadProgress: (progressEvent) => {
          // 对原生进度事件的处理
          console.log(progressEvent, 'progressEvent======进度');
        },
      })
        .then((response: any) => {
          const { data } = response;
          if (data.data) {
            succFun(`${data.data[0].id}${data.data[0].ext}`);
          }
        })
        .catch(() => {
          failFun('图品插入失败');
        });
    },
    // 自定义文件选择器的回调内容
    file_picker_callback: function (callback: any, value: any, meta: any) {
      if (meta.filetype == 'media') {
        //创建一个隐藏的type=file的文件选择input
        let input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.onchange = function () {
          console.log(input.files, 'file====', input);
          // console.log(file, 'file====');
          var CancelToken = axios.CancelToken;
          var formData = new FormData();
          var file: Array<any> = input.files;
          formData.append('file', file[0]);
          // formData.append('file', input.files , file.name);
          axios({
            timeout: 1000 * 60,
            url: config.actionImgUrl,
            method: 'POST',
            data: formData,
            cancelToken: new CancelToken((c) => {
              //行中断请求
              file[0].cancel = c;
            }),
            onUploadProgress: (progressEvent) => {
              // 对原生进度事件的处理
              console.log(progressEvent, 'progressEvent======进度');
            },
          })
            .then((response: any) => {
              const { data } = response;
              if (data.data) {
                callback(`${data.data[0].id}${data.data[0].ext}`);
                // succFun(`${data.data[0].id}${data.data[0].ext}`);
              }
            })
            .catch(() => {
              // failFun('图品插入失败');
            });
        };
        //触发点击
        input.click();
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
      key={id}
      initialValue={content || ''}
      apiKey="官网上申请的key值"
      //   initialValue={editorState}
      init={{ ...editorObj }}
      onEditorChange={handleEditorChange}
    />
  );
};

export default UrEditor;
