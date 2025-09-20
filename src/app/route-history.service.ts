import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RouteHistoryService {
  private historyStack: string[] = [];
  private currentUrl = '';
  private backing = false;
  private readonly forbiddenRoutes = ['payment-evolution', 'contract-details', 'advance-payment'];

  constructor(private router: Router) {
    this.currentUrl = this.router.url;
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe({
        next: (event: any) => this.handleNavigation(event),
        error: (err) => console.error('Erro no observable de eventos do router:', err)
      });
    this.loadHistory();
  }

  /**
   * Lida com o evento de navegação e gerencia o histórico.
   */
  private handleNavigation(event: NavigationStart): void {
    if (typeof event.url !== 'string') return;

    if (this.currentUrl && !this.backing) {
      console.log('Navegando para:', this.currentUrl);
      if (this.currentUrl === '/') {
        this.historyStack = [this.currentUrl];
        this.saveHistory();
      }
      if (this.isForbiddenRoute(this.currentUrl)) {
        console.log('Rota bloqueada para histórico:', this.currentUrl);
        this.resetHistory();
        this.logHistory();
      } else if (!this.historyStack.includes(this.currentUrl)) {
        console.log('Pushing:', this.currentUrl);
        this.historyStack.push(this.currentUrl);
        this.saveHistory();
        this.logHistory();
      } else {
        console.log('Rota já existe na pilha, não adicionando:', this.currentUrl);
      }
    }

    this.currentUrl = event.url;

    // Reset backing flag após navegação
    if (this.backing) {
      setTimeout(() => { this.backing = false; }, 100);
    }
  }

  /**
   * Verifica se a rota é proibida para histórico.
   */
  private isForbiddenRoute(url: string): boolean {
    return this.forbiddenRoutes.some(route => url.includes(route));
  }

  /**
   * Volta para a última rota registrada na pilha.
   */
  /**
   * Volta para a última rota registrada na pilha.
   */
  back(): void {
    if (this.historyStack.length === 0) {
      console.warn('Histórico de rotas vazio. Não é possível voltar.');
      return;
    }
    const lastUrl = this.historyStack.pop();
    this.saveHistory();
    if (!lastUrl || typeof lastUrl !== 'string') {
      console.warn('URL inválida no histórico:', lastUrl);
      return;
    }
    this.backing = true;
    this.logHistory();
    console.log('Navigating back to:', lastUrl);
    this.router.navigateByUrl(lastUrl).catch(err => {
      this.backing = false;
      console.error('Erro ao navegar para a última rota:', err);
    });
  }

  /**
   * Limpa o histórico de rotas.
   */
  /**
   * Limpa o histórico de rotas.
   */
  resetHistory(): void {
    this.clearHistory()
    this.saveHistory();
    this.currentUrl = this.router.url;
    this.backing = false;
  }

  /**
   * Retorna uma cópia do histórico de rotas.
   */
  /**
   * Retorna uma cópia do histórico de rotas.
   */
  getHistory(): string[] {
    return Array.isArray(this.historyStack) ? [...this.historyStack] : [];
  }

  /**
   * Salva o histórico no localStorage
   */
  private saveHistory(): void {
    try {
      localStorage.setItem('routeHistoryStack', JSON.stringify(this.historyStack));
    } catch (e) {
      console.error('Erro ao salvar histórico no localStorage:', e);
    }
  }

  /**
   * Carrega o histórico do localStorage
   */
  private loadHistory(): void {
    try {
      const data = localStorage.getItem('routeHistoryStack');
      if (data) {
        const parsed = JSON.parse(data);
        if (Array.isArray(parsed)) {
          this.historyStack = parsed.filter(item => typeof item === 'string');
        }
      }
    } catch (e) {
      console.error('Erro ao carregar histórico do localStorage:', e);
      this.historyStack = [];
    }
  }

    /**
   * Remove o histórico salvo no localStorage
   */
  clearHistory(): void {
    try {
      localStorage.removeItem('routeHistoryStack');
      this.historyStack = [];
      console.log('Histórico removido do localStorage.');
    } catch (e: any) {
      console.error('Erro ao remover histórico do localStorage:', e);
    }
  }

  logHistory(): void {
    console.log('History Stack:', this.getHistory());
  }
}
