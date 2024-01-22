import React from 'react';
import PropTypes from 'prop-types';
import WavesurferPlayer from '@wavesurfer/react'
import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js';

export default class Waveform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wavesurfer: null,
      wavesurferRegions: null
    }
  }

  componentDidUpdate(prevProps) {
    const { wavesurfer, wavesurferRegions } = this.state;
    const { range } = this.props;
    if (wavesurfer) {
      if (range && prevProps.range !== range) wavesurfer.seekTo(Math.min(1, Math.max(0, range[0])));
    }
    if (wavesurferRegions && prevProps.range !== range) {
      wavesurferRegions.clearRegions();
      wavesurferRegions.addRegion({
        id: 'cut',
        start: range ? range[0] : 0,
        end: range ? range[1] : 0,
        color: 'rgba(146, 210, 117, 0.3)',
        resize: false,
        drag: false
      })
    }
  }

  componentWillUnmount() {
    const { wavesurfer, wavesurferRegions } = this.state;
    if (wavesurfer) {
      wavesurfer.destroy();
    }
    if (wavesurferRegions) {
      wavesurferRegions.destroy();
    }
  }

  onReady = (wavesurfer) => {
    const { range, onReady } = this.props;
    const wavesurferRegions = wavesurfer.registerPlugin(Regions.create())
    wavesurferRegions.addRegion({
      id: 'cut',
      start: range ? range[0] : 0,
      end: range ? range[1] : 0,
      color: 'rgba(146, 210, 117, 0.3)',
      resize: false,
      drag: false
    })
    this.setState({ wavesurfer, wavesurferRegions });
    if (onReady) this.props.onReady();
  }


  render() {
    const { src, className, height } = this.props;
    return (
      <div className={className}>
        <WavesurferPlayer
          key={src}
          url={src}
          cursorWidth={0}
          height={height}
          waveColor={'#D1D6DA'}
          zoom={0}
          hideScrollbar={true}
          interact={false}
          progressColor={'#aeb3b7'}
          onReady={this.onReady}
        />
      </div>
    )
  }
}


Waveform.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  range: PropTypes.array,
  src: PropTypes.string,
  onReady: PropTypes.func,
};

Waveform.defaultProps = {
  className: '',
  height: 100,
  range: null,
  src: null,
  onReady: () => { },
};