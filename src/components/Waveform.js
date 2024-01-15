import React from 'react';
import PropTypes from 'prop-types';
import WavesurferPlayer from '@wavesurfer/react'
import Regions from 'wavesurfer.js/dist/plugins/regions.esm.js';
import debounce from 'lodash-es/debounce';

export default class Waveform extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      wavesurfer: null,
      wavesurferRegions: null
    }
    this._redraw = this._redraw.bind(this);
    this.redraw = debounce(this._redraw, 250);
  }

  componentDidMount() {
    window.addEventListener('resize', this.redraw);
  }

  componentDidUpdate(prevProps) {
    const { height } = this.props;
    if (prevProps.height !== height) {
      this.redraw();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.redraw);
  }

  _redraw() {
    const { height } = this.props;
    const { wavesurfer } = this.state;
    if (wavesurfer) {
      wavesurfer.setHeight(height);
      wavesurfer.drawBuffer();
    }
  }

  onReady = (wavesurfer) => {
    const { onReady, range } = this.props;
    const wavesurferRegions = wavesurfer.registerPlugin(Regions.create())
    wavesurferRegions.addRegion({
      id: 'cut',
      start: range ? range[0] : 0,
      end: range ? range[1] : 0,
      color: 'rgba(146, 210, 117, 0.3)',
      resize: false,
      drag: false
    })
    onReady(wavesurfer);
    this.redraw()
    this.setState(({ wavesurfer, wavesurferRegions }));
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
          progressColor={'#46be8ae6'}
          onReady={this.onReady}
        />
      </div>
    )
  }
}


Waveform.propTypes = {
  className: PropTypes.string,
  height: PropTypes.number,
  onReady: PropTypes.func,
  range: PropTypes.array,
  src: PropTypes.string,
};

Waveform.defaultProps = {
  className: '',
  height: 100,
  onReady: () => null,
  range: null,
  src: null,
};