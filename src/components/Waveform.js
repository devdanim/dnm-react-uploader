import React from 'react';
import PropTypes from 'prop-types';
import ReactWaves, { Regions } from '@dschoon/react-waves';
import debounce from 'lodash-es/debounce';

export default class Waveform extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        wavesurfer: null,
        duration: 0,
      }
      this.onLoading = this.onLoading.bind(this);
      this.onReady = this.onReady.bind(this);
      this.getRegions = this.getRegions.bind(this);
      this._redraw = this._redraw.bind(this);
      this.redraw = debounce(this._redraw, 250);
    }

    componentDidMount() {
        window.addEventListener('resize', this.redraw);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.redraw);
    }

    _redraw() {
        const { wavesurfer } = this.state;
        if (wavesurfer) wavesurfer.drawBuffer();
    }
  
    onLoading({ wavesurfer }) {
        wavesurfer.toggleInteraction();
        this.setState(({ wavesurfer }));
    };

    onReady() {
        const { onReady } = this.props;
        const { wavesurfer } = this.state;
        this.setState({ duration: wavesurfer.getDuration() });

        if (onReady) onReady();
    }

    getRegions() {
        const { duration } = this.state;
        const { range } = this.props;
        return {
            cut: {
                id: 'cut',
                start: range ? range[0] : 0,
                end: range ? range[1] : duration,
                color: 'rgba(146, 210, 117, 0.3)',
            }
        };
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
              progressColor: '#46be8ae6',
              responsive: true,
              waveColor: '#D1D6DA',
            }}
            zoom={1}
            pos={0}
            playing={false} 
            onReady={this.onReady}
            onLoading={this.onLoading}
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