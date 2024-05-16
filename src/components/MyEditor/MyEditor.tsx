import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import CustomEditor from "@/ckeditor3";

import React, { useEffect, useState } from "react";
import Alignment from "@ckeditor/ckeditor5-alignment/src/alignment";
import { useTheme } from "next-themes";

interface MyEditorProps {
  data: string;
  onChange: (event: any, editor: any) => void;
}

export default function MyEditor(props: MyEditorProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <div className="ckeditor-container">
      {mounted && (
        <CKEditor
          editor={CustomEditor}
          data={props.data}
          onChange={props.onChange}
          config={{
            // ui: {
            //   viewportOffset: { top: 200 },
            // },
            ckfinder: {
              uploadUrl: "/api/post/uploadImage",
            },
            link: {
              decorators: {
                toggleDownloadable: {
                  mode: "manual",
                  label: "Downloadable",
                  attributes: {
                    download: "file",
                  },
                },
                openInNewTab: {
                  mode: "manual",
                  label: "Open in a new tab",
                  defaultValue: true, // This option will be selected by default.
                  attributes: {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  },
                },
              },
            },
            toolbar: {
              items: [
                "italic",
                "bold",
                "underline",
                "fontSize",
                "blockQuote",
                "horizontalLine",
                "highlight",
                "fontBackgroundColor",
                "|",
                "-",
                "fontFamily",
                "alignment",
                "outdent",
                "indent",
                "|",
                "-",
                "link",
                "imageInsert",
                "imageUpload",
                "mediaEmbed",
                "htmlEmbed",
                "|",
                "bulletedList",
                "numberedList",
                "|",
                "undo",
                "redo",
                "|",
              ],
              shouldNotGroupWhenFull: true,
            },
            mediaEmbed: {
              previewsInData: true,
              // 미디어 임베드 설정을 추가
              extraProviders: [
                {
                  name: "afreecatv",
                  url: /^https:\/\/vod\.afreecatv\.com\/PLAYER\/STATION\/(\d+)/,
                  html: (match) => {
                    const videoId = match[1];
                    return (
                      `<iframe width="640" height="360" src="https://vod.afreecatv.com/player/${videoId}" ` +
                      `frameborder="0" allowfullscreen></iframe>`
                    );
                  },
                },
              ],
            },

            language: "ko",
          }}
        />
      )}
    </div>
  );
}
