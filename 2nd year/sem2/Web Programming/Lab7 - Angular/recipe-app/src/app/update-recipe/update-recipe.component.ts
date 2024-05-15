import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../recipes.service';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from '../types/Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-recipe',
  templateUrl: './update-recipe.component.html',
  styleUrls: ['./update-recipe.component.css'],
})
export class UpdateRecipeComponent implements OnInit {
  recipeForm!: FormGroup;
  recipes: Recipe[] = [];
  recipe: Recipe | undefined;

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? +idParam : null;
    this.recipesService.getRecipes().subscribe((data: Recipe[]) => {
      console.log(data); // Verify data content
      this.recipes = data;
      console.log(id);
      let idString: string;
      if (id) {
        idString = id.toString();
      }
      const aux: Recipe | undefined = this.recipes.find(
        (recipe) => recipe.id.toString() === idString
      );
      if (aux) {
        this.recipe = aux;
        console.log(this.recipe);
        this.recipeForm = this.fb.group({
          id: id,
          author: [`${this.recipe?.author}`, Validators.required],
          name: [`${this.recipe?.name}`, Validators.required],
          type: [`${this.recipe?.type}`, Validators.required],
          ingredients: [`${this.recipe?.ingredients}`, Validators.required],
          instructions: [`${this.recipe?.instructions}`, Validators.required],
        });
      } else {
        console.log('Recipe not found for ID:', id);
      }
    });
  }

  onSubmit() {
    this.recipesService.updateRecipe(this.recipeForm.value).subscribe(
      (response) => {
        this.recipeForm.reset();
        console.log('Server response:', response);
        this.router.navigate(['/recipes']);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
