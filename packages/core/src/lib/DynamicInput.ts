type InputType = 'text' | 'email' | 'password' | 'number' | 'date' | 'color' | 'time' | 'select' | 'textarea';

type ElementForType<T extends InputType> =
  T extends 'select' ? HTMLSelectElement :
  T extends 'textarea' ? HTMLTextAreaElement :
  HTMLInputElement;

export class DynamicInput<T extends InputType> {
  private element: ElementForType<T>;

  constructor(
    private type: T, // Le type d'input peut être passé dynamiquement
    private attributes: Record<string, string> = {},
    private options: string[] = [] // Pour les <select>
  ) {
    this.element = this.createElement();
  }

  private createElement(): ElementForType<T> {
    let el: HTMLElement;

    // Créer un élément en fonction du type spécifié
    if (this.type === 'select') {
      // Si le type est select, créer un élément <select>
      el = document.createElement('select');
      this.options.forEach((option) => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        el.appendChild(opt);
      });
    } else if (this.type === 'textarea') {
      // Si le type est textarea, créer un élément <textarea>
      el = document.createElement('textarea');
    } else {
      // Si c'est un input classique, créer un élément <input> avec le type dynamique
      el = document.createElement('input');
      (el as HTMLInputElement).type = this.type; // Assigner le type de l'input (text, email, etc.)
    }

    // Ajouter les attributs spécifiés à l'élément
    Object.entries(this.attributes).forEach(([key, value]) => {
      el.setAttribute(key, value);
    });

    return el as ElementForType<T>;
  }

  // Méthode pour récupérer l'élément dynamique créé
  public getElement(): ElementForType<T> {
    return this.element;
  }
}
