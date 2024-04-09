# Objectifs

Créer un sytème de modules gérant le DOM :
- InvalidStructureError : permettant de gérer les erreurs de structure
- DOMPlugin : permettant de gérer les plugins affiliés au DOM
- carousel : permettant de gérer un carousel d'images
- accordion : permettant de gérer un accordéon

## Custom Error : InvalidStructureError
Créer une classe `InvalidStructureError` permettant de gérer les erreurs de structure. Cette classe doit hériter de `TypeError`

```javascript
const error = new InvalidStructureError({toto: "extra property", type: "missing property"});
console.log(error.message);
// => "Invalid structure: toto is not valid, type is missing"
```

## DOMPlugin
Créer une classe `DOMPlugin` permettant de gérer les plugins affiliés au DOM. Cette classe doit être abstraite, si la classe est directement instancié, lever un error `TypeError` avec le message `"DOMPlugin is an abstract class`. La structure créée dynamiquement doit être stockée dans une propriété privée `structure` de type `Object`.

- Son constructeur prendra en paramètre un objet de configuration avec les propriétés suivantes (**privées**) :
  - `container` : élément HTML dans lequel les éléments seront créés
  - `rerenderEvent`: événement qui permet de recharger les éléments (par défaut `rerender`)
- Créer une méthode *publique* `getStructure` permettant de récupérer la structure actuelle
- Créer une méthode *publique* `createElement` permettant de créer un élément HTML à partir d'une structure (vu en cours)
- Créer une méthode *publique* `validateStructure` permettant de vérifier si une structure donnée en argument correspond à une structure valide (vu en cours). Une erreur `InvalidStructureError` doit être levée prenant en argument l'ensemble des clés en erreurs.
- Créer une méthode *publique* `render` celle-ci doit être abstraite et doit être implémentée dans les classes filles. Lever une erreur `TypeError` si la méthode n'est pas implémentée avec le message `Method "render" must be implemented for class "[class name]"`, remplacer `class name` par le nom de la classe n'ayant pas implémenté `render`.
```js
class Test extends DOMPlugin {}
const test = new Test({container: document.body});
try {
  test.render();
} catch (e) {
  console.log(e.message);
  // => TypeError: Method "render" must be implemented for class "Test"
}
class Test2 extends DOMPlugin {
  render() {
    return "rendered";
  }
}
const test2 = new Test2({container: document.body});
try {
  console.log(test2.render());
  // => "rendered"
} catch (e) {
}

try {
    new DOMPlugin({container: document.body});
} catch (e) {
    console.log(e.message);
    // => TypeError: DOMPlugin is an abstract class
}
```

## Carousel
Créer une classe `Carousel` héritant de `DOMPlugin` permettant de gérer un carousel d'images.

- Son constructeur prendra en paramètre un objet de configuration avec les propriétés suivantes (**privées**) :
  - `container` : élément HTML dans lequel le carousel sera créé
  - `rerenderEvent`: événement qui permet de recharger le carousel (par défaut `rerender`)
  - `images` : tableau d'images à afficher
  - `autoplay` : booléen indiquant si le carousel doit défiler automatiquement

- Créer une méthode *publique* `withArrows` permettant d'afficher deux flèches de navigation (gauche et droite) sur les côtés du carousel qui doivent avoir un attribut `data-rel="next"` ou `data-rel="prev"` et change d'images en cliquant dessus. L'objet de configuration suivant :
  - `left` : structure (vu en cours) pour la flèche de gauche
  - `right` : structure (vu en cours) pour la flèche de droite
**Ne pas les afficher respectivement si nous sommes sur la première ou la dernière image.**
- Créer une méthode *publique* `withKeyboardShortcuts` () permettant de naviguer entre les images avec les flèches de gauche et de droite (clavier) prenant l'objet de configuration suivant : 
    - `left` : touche pour aller à l'image précédente (par défaut `ArrowLeft`)
    - `right` : touche pour aller à l'image suivante (par défaut `ArrowRight`)
- Créer une méthode *publique* `render` permettant de générer le carousel sous l'élément `container`. Si `autoplay` est `true`, les images doivent défiler automatiquement toutes les 5 secondes.

```text
Exemple pour le carousel :
< image >
```

**Aucune utilisation du CSS/style n'est autorisée, seule doit apparaître dans le DOM les éléments qui doivent être visible**
**Toute fonction demandant une structure doit être validée avec la méthode `validateStructure` de la classe `DOMPlugin`**

## Accordion
Créer une classe `Accordion` héritant de `DOMPlugin` permettant de gérer un accordéon. Un accordéon est une liste de block avec un titre et un contenu où seule un contenu peut être visible à la fois.

- Son constructeur prendra en paramètre un objet de configuration avec les propriétés suivantes (**privées**) :
  - `container` : élément HTML dans lequel l'accordéon sera créé
  - `rerenderEvent`: événement qui permet de recharger l'accordéon (par défaut `rerender`)
  - `items` : tableau d'objets avec les propriétés suivantes :
    - `title` : titre du block (text)
    - `content` : Contenu du block (text)
- Créer une méthode *publique* `withBlockContainer`: structure (vu en cours) correspondant à un block de l'accordéon et ajouter un dataset `data-rel="block"` à la génération(défault: équivalent d'une div)
- Créer une méthode *publique* `withBlockTitle` : structure (vu en cours) correspondant au titre d'un block et ajouter un dataset `data-rel="block-title"` à la génération
- Créer une méthode *publique* `withBlockContent` : structure (vu en cours) correspondant au contenu d'un block et ajouter un dataset `data-rel="block-content"` à la génération
- Créer une méthode *publique* `render` permettant de générer l'accordéon sous l'élément `container`.
```text
Exemple pour l'accordéon :
block (fermé)
  blockTitle
block (ouvert)
  blockTitle
  blockContent
block (fermé)
  blockTitle
block (fermé)
  blockTitle
```

## Obligations
- **Aucune utilisation du CSS/style n'est autorisée, seule doit apparaître dans le DOM les éléments qui doivent être visible**
- **Toute fonction demandant une structure doit être validée avec la méthode `validateStructure` de la classe `DOMPlugin`**
- **Chaque action doit mettre à jour la structure dans le plugin et non directement dans le DOM, un événement au nom de la valeur `rerenderEvent` doit relancer la fonction `render` en remplaçant l'ancien contenu par le nouveau**