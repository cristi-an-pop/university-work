namespace Lab1
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.components = new System.ComponentModel.Container();
            this.mountainBikesStoreDataSet = new Lab1.MountainBikesStoreDataSet();
            this.brandsBindingSource = new System.Windows.Forms.BindingSource(this.components);
            this.brandsTableAdapter = new Lab1.MountainBikesStoreDataSetTableAdapters.BrandsTableAdapter();
            this.dataGridViewBrands = new System.Windows.Forms.DataGridView();
            this.dataGridViewBikes = new System.Windows.Forms.DataGridView();
            this.updateButton = new System.Windows.Forms.Button();
            this.deleteButton = new System.Windows.Forms.Button();
            this.Add = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.brandsBindingSource)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewBrands)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewBikes)).BeginInit();
            this.SuspendLayout();
            // 
            // mountainBikesStoreDataSet
            // 
            this.mountainBikesStoreDataSet.DataSetName = "MountainBikesStoreDataSet";
            this.mountainBikesStoreDataSet.SchemaSerializationMode = System.Data.SchemaSerializationMode.IncludeSchema;
            // 
            // brandsBindingSource
            // 
            this.brandsBindingSource.DataMember = "Brands";
            this.brandsBindingSource.DataSource = this.mountainBikesStoreDataSet;
            // 
            // brandsTableAdapter
            // 
            this.brandsTableAdapter.ClearBeforeFill = true;
            // 
            // dataGridViewBrands
            // 
            this.dataGridViewBrands.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewBrands.Location = new System.Drawing.Point(0, 0);
            this.dataGridViewBrands.Name = "dataGridViewBrands";
            this.dataGridViewBrands.Size = new System.Drawing.Size(451, 150);
            this.dataGridViewBrands.TabIndex = 0;
            this.dataGridViewBrands.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewBrands_CellClick);
            // 
            // dataGridViewBikes
            // 
            this.dataGridViewBikes.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dataGridViewBikes.Location = new System.Drawing.Point(514, 0);
            this.dataGridViewBikes.Name = "dataGridViewBikes";
            this.dataGridViewBikes.Size = new System.Drawing.Size(451, 150);
            this.dataGridViewBikes.TabIndex = 1;
            // 
            // updateButton
            // 
            this.updateButton.Location = new System.Drawing.Point(719, 216);
            this.updateButton.Name = "updateButton";
            this.updateButton.Size = new System.Drawing.Size(75, 23);
            this.updateButton.TabIndex = 2;
            this.updateButton.Text = "Update";
            this.updateButton.UseVisualStyleBackColor = true;
            this.updateButton.Click += new System.EventHandler(this.updateButton_Click);
            // 
            // deleteButton
            // 
            this.deleteButton.Location = new System.Drawing.Point(719, 264);
            this.deleteButton.Name = "deleteButton";
            this.deleteButton.Size = new System.Drawing.Size(75, 23);
            this.deleteButton.TabIndex = 3;
            this.deleteButton.Text = "Delete";
            this.deleteButton.UseVisualStyleBackColor = true;
            this.deleteButton.Click += new System.EventHandler(this.deleteButton_Click);
            // 
            // Add
            // 
            this.Add.Location = new System.Drawing.Point(719, 315);
            this.Add.Name = "Add";
            this.Add.Size = new System.Drawing.Size(75, 23);
            this.Add.TabIndex = 4;
            this.Add.Text = "Add";
            this.Add.UseVisualStyleBackColor = true;
            this.Add.Click += new System.EventHandler(this.Add_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(965, 567);
            this.Controls.Add(this.Add);
            this.Controls.Add(this.deleteButton);
            this.Controls.Add(this.updateButton);
            this.Controls.Add(this.dataGridViewBikes);
            this.Controls.Add(this.dataGridViewBrands);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.mountainBikesStoreDataSet)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.brandsBindingSource)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewBrands)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewBikes)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion
        private MountainBikesStoreDataSet mountainBikesStoreDataSet;
        private System.Windows.Forms.BindingSource brandsBindingSource;
        private MountainBikesStoreDataSetTableAdapters.BrandsTableAdapter brandsTableAdapter;
        private System.Windows.Forms.DataGridView dataGridViewBrands;
        private System.Windows.Forms.DataGridView dataGridViewBikes;
        private System.Windows.Forms.Button updateButton;
        private System.Windows.Forms.Button deleteButton;
        private System.Windows.Forms.Button Add;
    }
}

