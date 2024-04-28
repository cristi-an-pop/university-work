import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recipe } from './types/Recipe';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private ApiURL = 'http://localhost/web/backend';

  constructor(private http: HttpClient) {}

  getRecipes() {
    return this.http.get<Recipe[]>(`${this.ApiURL}/get_recipes.php`);
  }

  addRecipe(recipe: Recipe) {
    const formData = new FormData();
    for (const key in recipe) {
      if (recipe.hasOwnProperty(key)) {
        formData.append(key, recipe[key]);
      }
    }
    return this.http.post(`${this.ApiURL}/add_recipe.php`, formData);
  }

  deleteRecipe(id: number) {
    return this.http.delete(`${this.ApiURL}/delete_recipe.php?id=${id}`);
  }

  updateRecipe(recipe: any) {
    return this.http.post(
      `${this.ApiURL}/update_recipe.php`,
      JSON.stringify(recipe)
    );
  }
}
