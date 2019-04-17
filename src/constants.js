const Constants = {
    video: { // see https://en.wikipedia.org/wiki/Video_file_format
        mimeTypes: [
            'video/x-flv',
            'video/mp4',
            'application/octet-stream',
            'application/x-mpegURL',
            'video/MP2T',
            'video/3gpp',
            'video/quicktime',
            'video/x-msvideo',
            'video/x-ms-wmv',
        ],
        extensions: [
            '3g2',
            '3gp',
            'amv',
            'asf',
            'avi',
            'drc',
            'f4a',
            'f4b',
            'f4p',
            'f4v',
            'flv',
            'gif',
            'gifv',
            'm2v',
            'm4p',
            'm4v',
            'mkv',
            'mov',
            'mng',
            'mp2',
            'mp4',
            'mpe',
            'mpeg',
            'mpg',
            'mpv',
            'MTS',
            'M2TS',
            'mxf',
            'nsv',
            'ogg',
            'qt',
            'rm',
            'rmvb',
            'roq',
            'svi',
            'vob',
            'webm',
            'wmv',
            'yuv',
        ]
    },
    image: { // see https://github.com/arthurvr/image-extensions/blob/master/image-extensions.json
        mimeTypes: [
            'image/gif',
            'image/jpeg',
            'image/png',
            'image/tiff',
            'image/vnd.microsoft.icon',
            'image/vnd.djvu',
            'image/svg+xml',
        ],
        extensions: [
            '3dv',
            'PI1',
            'PI2',
            'PI3',
            'ai',
            'amf',
            'art',
            'art',
            'ase',
            'awg',
            'blp',
            'bmp',
            'bw',
            'bw',
            'cd5',
            'cdr',
            'cgm',
            'cit',
            'cmx',
            'cpt',
            'cr2',
            'cur',
            'cut',
            'dds',
            'dib',
            'djvu',
            'dxf',
            'e2d',
            'ecw',
            'egt',
            'egt',
            'emf',
            'eps',
            'exif',
            'fs',
            'gbr',
            'gif',
            'gpl',
            'grf',
            'hdp',
            'icns',
            'ico',
            'iff',
            'iff',
            'int',
            'int',
            'inta',
            'jfif',
            'jng',
            'jp2',
            'jpeg',
            'jpg',
            'jps',
            'jxr',
            'lbm',
            'lbm',
            'liff',
            'max',
            'miff',
            'mng',
            'msp',
            'nitf',
            'nrrd',
            'odg',
            'ota',
            'pam',
            'pbm',
            'pc1',
            'pc2',
            'pc3',
            'pcf',
            'pct',
            'pcx',
            'pcx',
            'pdd',
            'pdn',
            'pgf',
            'pgm',
            'pict',
            'png',
            'pnm',
            'pns',
            'ppm',
            'psb',
            'psd',
            'psp',
            'px',
            'pxm',
            'pxr',
            'qfx',
            'ras',
            'raw',
            'rgb',
            'rgb',
            'rgba',
            'rle',
            'sct',
            'sgi',
            'sgi',
            'sid',
            'stl',
            'sun',
            'svg',
            'sxd',
            'tga',
            'tga',
            'tif',
            'tiff',
            'v2d',
            'vnd',
            'vrml',
            'vtf',
            'wdp',
            'webp',
            'wmf',
            'x3d',
            'xar',
            'xbm',
            'xcf',
            'xpm',
        ]
    },
    compressedFile: { // see https://en.wikipedia.org/wiki/List_of_archive_formats
        mimeTypes: [
            // compression only
            'application/x-bzip2',
            'application/gzip',
            'application/x-lzip',
            'application/x-lzma',
            'application/x-lzop',
            'application/x-snappy-framed',
            'application/x-xz',
            'application/x-compress',
            // archiving and compression
            'application/x-7z-compressed',
            'application/x-ace-compressed',
            'application/x-astrotite-afa',
            'application/x-alz-compressed',
            'application/vnd.android.package-archive',
            'application/x-arj',
            'application/x-b1',
            'application/vnd.ms-cab-compressed',
            'application/x-cfs-compressed',
            'application/x-dar',
            'application/x-dgc-compressed',
            'application/x-apple-diskimage',
            'application/x-gca-compressed',
            'application/x-lzh',
            'application/x-lzx',
            'application/x-rar-compressed',
            'application/x-stuffit',
            'application/x-stuffitx',
            'application/x-gtar',
            'application/zip',
            'application/x-zoo',
        ],
        extensions: [
            // compression only
            'bz2',
            'gz',
            'F',
            'lz',
            'lzma',
            'lzo',
            'rz',
            'sfark',
            'sz',
            'xz',
            'z',
            'Z',
            '?Q?',
            '?XF',
            '?Z?',
            '??_',
            // archiving and compression
            '7z',
            'ace',
            'afa',
            'alz',
            'apk',
            'arc',
            'arj',
            'b1',
            'b6z',
            'ba',
            'bh',
            'cab',
            'car',
            'cfs',
            'cpt',
            'dar',
            'dd',
            'dgc',
            'dmg',
            'ear',
            'gca',
            'ha',
            'hki',
            'ice',
            'jar',
            'kgb',
            'lha',
            'lzh',
            'lzx',
            'pak',
            'paq6',
            'paq7',
            'paq8',
            'partimg',
            'pea',
            'pim',
            'pit',
            'qda',
            'rar',
            'rk',
            's7z',
            'sda',
            'sea',
            'sen',
            'sfx',
            'shk',
            'sit',
            'sitx',
            'sqx',
            'tar.bz2',
            'tar.gz',
            'tar.lzma',
            'tar.xz',
            'tar.Z',
            'tbz2',
            'tgz',
            'tlz',
            'txz',
            'ue2',
            'uc',
            'uc0',
            'uc2',
            'uca',
            'ucn',
            'uha',
            'ur2',
            'war',
            'wim',
            'xar',
            'xp3',
            'yz1',
            'zip',
            'zipx',
            'zoo',
            'zpaq',
            'zz',
        ]
    }
};

export default Constants;