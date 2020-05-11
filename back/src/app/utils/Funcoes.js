import md5 from 'md5';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

class Funcoes {
  constructor() {
    this.CalculatedCardNumber();
    this.strToDate();
  }
  CalculatedCardNumber(id_chip, id_evento) {
    return md5(id_chip + id_evento + '@easyAGVM2');
  }

  strToDate(dateStr) {
    if (dateStr) {
      return format(parseISO(dateStr), 'dd/MM/yyyy', {
        locale: pt,
        addSuffix: true,
      });
    }
    return '';
  }

  getCurrentFullHour() {
    const currentDate = new Date();
    return currentDate.getHours().toString() + ':' + currentDate.getMinutes().toString() + ':' + currentDate.getSeconds().toString();
  }
  getCurrentFullDate() {
    return format(new Date(), 'yyyy-MM-dd');
  }
};

export default new Funcoes();
