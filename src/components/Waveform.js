import React from 'react';
import PropTypes from 'prop-types';
import ReactWaves, { Regions } from '@dschoon/react-waves';
import debounce from 'lodash-es/debounce';

export default class Waveform extends React.Component {

    constructor(props) {
      super(props);
      this.wavesurfer = null;
      this.onReady = this.onReady.bind(this);
      this.getRegions = this.getRegions.bind(this);
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
        if (this.wavesurfer) {
          this.wavesurfer.setHeight(height);
          this.wavesurfer.drawBuffer();
        }
    }

    onReady({ wavesurfer }) {
      const { onReady } = this.props;
      this.wavesurfer = wavesurfer;
      this.wavesurfer.toggleInteraction();
      this.redraw();
      if (onReady) onReady(this.wavesurfer);
    }

    getRegions() {
        const { range } = this.props;
        return range ? {
            cut: {
                id: 'cut',
                start: range[0],
                end: range[1],
                color: 'rgba(146, 210, 117, 0.3)',
                drag: false,
                resize: false,
            }
        } : null;
    }
 
    render () {
        const { src, range, className, height } = this.props;
        const regions = this.getRegions();
        return (
          <ReactWaves
            audioFile={src}
            className={className}
            options={{
              barGap: 3,
              barWidth: 4,
              barHeight: 2,
              barRadius: 3,
              cursorWidth: 0,
              hideScrollbar: true,
              height,
              interact: false,
              progressColor: '#46be8ae6',
              waveColor: '#D1D6DA',
            }}
            zoom={0}
            pos={0}
            playing={false} 
            onReady={this.onReady}
          >
            <Regions
                regions={regions}
            />
          </ReactWaves>
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