import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../recipes.service';
import { Recipe } from '../types/Recipe';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  recipes: Recipe[] = [];
  filteredRecipes: Recipe[] = [];
  types: string[] = [];
  selectedType = 'All';

  constructor(private recipeService: RecipesService, private router: Router) {}

  ngOnInit() {
    this.getRecipes();
  }

  getRecipes() {
    this.recipeService.getRecipes().subscribe((data: Recipe[]) => {
      this.recipes = data;
      this.filterRecipes();
      const typesSet = new Set(this.recipes.map((recipe) => recipe.type));
      this.types = Array.from(typesSet);
    });
  }

  addRecipe() {
    this.router.navigate(['/add-recipe']);
  }

  deleteRecipe(id: number) {
    if (confirm('Are you sure you want to delete this recipe?')) {
      this.recipeService.deleteRecipe(id).subscribe(() => {
        this.getRecipes();
        window.location.reload();
      });
    } else {
      return;
    }
  }

  updateRecipe(recipe: Recipe, id: number) {
    this.router.navigate(['/update-recipe', id]);
  }

  filterRecipes() {
    if (this.selectedType && this.selectedType !== 'All') {
      this.filteredRecipes = this.recipes.filter(
        (recipe) => recipe.type === this.selectedType
      );
    } else {
      this.filteredRecipes = this.recipes;
    }
  }

  onTypeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedType = selectElement.value;
    this.filterRecipes();
  }
}
