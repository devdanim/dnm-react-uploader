import { css, keyframes } from '@emotion/core';

const pulse = keyframes`
    from {
        transform: scale(0.7);
    }
    50% {
        transform: scale(1);
    }
    to {
        transform: scale(0.7);
    }
`;
export default {
    uploader: css`
        position: relative;
        
        img {
            max-height: 100%;
            max-width: 100%;
            height: auto;
            width: auto;
        }
        
        .uploader-url-addon {
            display: flex;
            align-items: center;
            padding: .375rem .75rem;
            margin-bottom: 0;
            font-weight: 400;
            line-height: 1.5;
            color: #495057;
            text-align: center;
            white-space: nowrap;
            background-color: #e9ecef;
            border: 1px solid #ced4da;
            border-left-width: 0;
            border-top-right-radius: 0;
            border-top-left-radius: 0;
            border-bottom-left-radius: 0;
            border-bottom-right-radius: .25rem;
            
            svg {
                margin-right: 0.6rem;
                fill: #495057;
                height: 1.4rem;
            }
        }
        
        .uploader-url-input {
            display: block;
            height: calc(1.5em + .75rem + 2px);
            padding: .375rem .75rem;
            font-weight: 400;
            font-size: 1rem;
            line-height: 1.5;
            color: #495057;
            background-color: #fff;
            background-clip: padding-box;
            border: 1px solid #ced4da;
            border-radius: .25rem;
            border-top-left-radius: 0;
            border-top-right-radius: 0;
            border-bottom-right-radius: 0;
            position: relative;
            flex-grow: 1;
            margin-bottom: 0;
            
            &:focus {
                outline: none;
            }
        }
        
        .uploader-url {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: stretch;
            flex-flow: row;
            cursor: pointer;
        }
        
        .uploader-zone {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: row wrap;
            width: 100%;
            height: 14rem;
            overflow: hidden;
            position: relative;
            color: white;
        }
    
        .uploader-zone-fog {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-flow: column;
            background: rgba(0, 0, 0, 0.2);
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            cursor: pointer;
            
            &:hover {
                background: rgba(0, 0, 0, 0.5);
            }
        }
        
        .uploader-zone-fog-core {
            display: flex;
            justify-content: space-evenly;
            align-items: center;
            flex-flow: column;
            width: 100%;
            height: 100%;
        }
        
        .uploader-zone-fog-text {
            width: 80%;
            text-align: center;
            position: relative;
            bottom: 1rem;
            margin-top: 1rem;
            text-shadow: 0 0 0.5rem black;
        }
        
        .uploader-zone-fog-img {
            width: 5rem;
            fill: white;
            position: relative;
            top: 1rem;
        }
        
        .uploader-zone-fog-caption {
            background: rgba(0, 0, 0, 0.3);
            padding: 0.2rem 0.4rem;
            font-size: 75%;
            color: white;
            border-radius: 0.3rem 0.3rem 0px 0px;
            position: absolute;
            bottom: 0px;
            left: 50%;
            transform: translateX(-50%);
        }
        
        .uploader-input {
            position: fixed;
            top: -9999px;
            left: -9999px;
        }

        .uploader-waveform {
            width: 100%;
            padding: 0;
            margin: 0;
            z-index: 0;
        }

        .wavesurfer-region {
            z-index: 3 !important;
          }
          
        .wavesurfer-handle {
            background-color: rgba(146, 210, 117, 0.9) !important;
            width: 4px !important;
        }
    `,
    'uploader/compact': css`
        .uploader-zone {
            border-radius: .5rem;
            height: 4rem;
        }
        .uploader-zone-fog-img {
            width: 3rem;
            top: 0;
        }
    `,
    'uploader/fetching': css`
        .uploader-zone-fog-core {
            position: fixed;
            top: -9999px;
            left: -9999px;
        }
    `,
    'uploader/withUrl': css`
        .uploader-zone {
            border-top-left-radius: 0.25rem !important;
            border-top-right-radius: 0.25rem !important;
            border-bottom-left-radius: 0 !important;
            border-bottom-right-radius: 0 !important;
        }
    `,
    'uploader/withControls': css`
        .uploader-zone-fog-text {
            margin-top: 0;
            bottom: 0;
        }
        .uploader-zone-fog-img {
            width: 2.6rem;
            top: 0.3rem;
        }
        .uploader-zone-fog-controls {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: row wrap;
            position: relative;
            bottom: 0.3rem;
            
            > * {
                margin: 0 0.3rem;
            }
        }
        .uploader-zone-fog-or {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-flow: row;
            font-size: 80%;
            width: 100%;
        }
        .uploader-zone-fog-or-wing {
            flex-grow: 1;
            height: 0;
            border-style: solid;
            border-width: .06rem 0 0 0;
            border-color: white;
        }
        .uploader-zone-fog-or-body {
            padding: 0.5rem 0.7rem;
            user-select: none;
        }
        .uploader-zone-fog-controls-control {
            height: 1.6rem;
            width: 1.6rem;
            fill: white;
        }
    `
};