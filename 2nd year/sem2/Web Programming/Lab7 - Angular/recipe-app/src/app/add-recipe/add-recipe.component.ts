import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../types/Recipe';
import { RecipesService } from '../recipes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css'],
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private recipesService: RecipesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.recipeForm = this.fb.group({
      author: ['', Validators.required],
      name: ['', Validators.required],
      type: ['', Validators.required],
      ingredients: ['', Validators.required],
      instructions: ['', Validators.required],
    });
  }

  onSubmit() {
    const recipe: Recipe = this.recipeForm.value;
    this.recipesService.addRecipe(this.recipeForm.value).subscribe(
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
