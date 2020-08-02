export default {
  colorYellow: '#FFEB00',
  colorOrange: '#E6500F',
  colorBlue: '#55BEFF',
  colorGrey: '#0000008C',
  colorBlack: '#000',
  colorWhite: '#FFF',
  // color helper
  getColorByName: function (color: string) {
    switch (color) {
      case 'yellow':
        return this.colorYellow;
      case 'orange':
        return this.colorOrange;
      case 'blue':
        return this.colorBlue;
      case 'grey':
        return this.colorGrey;
      case 'black':
        return this.colorBlack;
      case 'white':
        return this.colorWhite;
      default:
        return this.colorWhite;
    }
  },
};
