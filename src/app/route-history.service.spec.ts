
// Mocks para ambiente Jest puro
class NavigationStartMock {
  readonly type = 0;
  constructor(public url: string, public id = 1) {}
}

class RouterMock {
  url = '/home';
  events = {
    pipe: jest.fn().mockReturnThis(),
    subscribe: jest.fn()
  };
  navigateByUrl = jest.fn().mockResolvedValue(true);
}

import { RouteHistoryService } from './route-history.service';

describe('RouteHistoryService', () => {

  let service: RouteHistoryService;
  let routerMock: RouterMock;

  beforeEach(() => {
    routerMock = new RouterMock();
    service = new RouteHistoryService(routerMock as any);
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    localStorage.clear();
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('deve inicializar com url atual', () => {
    expect(service['currentUrl']).toBe('/home');
  });


  it('deve adicionar rota ao histórico', () => {
    service['currentUrl'] = '/about';
    service['backing'] = false;
    service['handleNavigation'](new NavigationStartMock('/about'));
    expect(service.getHistory()).toContain('/about');
  });


  it('não deve adicionar rota proibida ao histórico', () => {
    service['currentUrl'] = '/payment-evolution';
    service['backing'] = false;
    service['handleNavigation'](new NavigationStartMock('/payment-evolution'));
    expect(service.getHistory()).toEqual([]);
  });

  it('deve voltar para a última rota', async () => {
    service['historyStack'] = ['/home', '/about'];
    service.back();
    expect(service.getHistory()).toEqual(['/home']);
    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/about');
  });

  it('deve limpar o histórico', () => {
    service['historyStack'] = ['/home', '/about'];
    service.resetHistory();
    expect(service.getHistory()).toEqual([]);
  });

  it('deve salvar e carregar histórico do localStorage', () => {
    service['historyStack'] = ['/home', '/about'];
    service['saveHistory']();
    service['historyStack'] = [];
    service['loadHistory']();
    expect(service.getHistory()).toEqual(['/home', '/about']);
  });

  it('deve remover histórico do localStorage', () => {
    service['historyStack'] = ['/home', '/about'];
    service['saveHistory']();
    service.clearHistory();
    expect(localStorage.getItem('routeHistoryStack')).toBeNull();
    expect(service.getHistory()).toEqual([]);
  });

  it('deve retornar cópia do histórico', () => {
    service['historyStack'] = ['/home', '/about'];
    const history = service.getHistory();
    expect(history).toEqual(['/home', '/about']);
    history.push('/other');
    expect(service.getHistory()).toEqual(['/home', '/about']);
  });

  it('deve logar o histórico', () => {
    const spy = jest.spyOn(console, 'log');
    service['historyStack'] = ['/home', '/about'];
    service.logHistory();
    expect(spy).toHaveBeenCalledWith('History Stack:', ['/home', '/about']);
  });
});
