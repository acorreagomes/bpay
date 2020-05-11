import md5 from 'react-native-md5';
import { parseISO, format, formatRelative } from 'date-fns';
import pt from 'date-fns/locale/pt';

class Funcoes {
  constructor() {
    this.CalculatedCardNumber();
    this.Saudacao();
    this.strToDate();
    this.copySplitedStr();
  }

  // eslint-disable-next-line class-methods-use-this
  CalculatedCardNumber(id_chip, id_evento) {
    return md5.hex_md5(`${id_chip + id_evento}@easyAGVM2`);
  }

  // eslint-disable-next-line class-methods-use-this
  copySplitedStr(str, indexStrCopy) {
    if (str) {
      return str
        .split(' ')
        .slice(0, indexStrCopy)
        .join(' ');
    }
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  strToDate(dateStr) {
    if (dateStr) {
      return format(parseISO(dateStr), 'dd/MM/yyyy', {
        locale: pt,
        addSuffix: true,
      });
    }
    return '';
  }

  // eslint-disable-next-line class-methods-use-this
  Saudacao() {
    const d = new Date();
    const hour = d.getHours();
    if (hour < 5) {
      return 'Boa noite';
    }
    if (hour < 8) {
      return 'Bom dia';
    }
    if (hour < 12) {
      return 'Bom dia';
    }
    if (hour < 18) {
      return 'Boa tarde';
    }
    return 'Boa noite';
  }
}

export default new Funcoes();
