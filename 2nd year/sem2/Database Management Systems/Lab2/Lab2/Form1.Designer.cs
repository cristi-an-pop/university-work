namespace Lab2
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
            this.parentTableView = new System.Windows.Forms.DataGridView();
            this.childTableView = new System.Windows.Forms.DataGridView();
            this.btnUpdate = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.parentTableView)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.childTableView)).BeginInit();
            this.SuspendLayout();
            // 
            // parentTableView
            // 
            this.parentTableView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.parentTableView.Location = new System.Drawing.Point(12, 12);
            this.parentTableView.Name = "parentTableView";
            this.parentTableView.Size = new System.Drawing.Size(338, 426);
            this.parentTableView.TabIndex = 0;
            this.parentTableView.SelectionChanged += new System.EventHandler(this.parentTableView_SelectionChanged);
            // 
            // childTableView
            // 
            this.childTableView.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.childTableView.Location = new System.Drawing.Point(356, 12);
            this.childTableView.Name = "childTableView";
            this.childTableView.Size = new System.Drawing.Size(338, 426);
            this.childTableView.TabIndex = 5;
            // 
            // btnUpdate
            // 
            this.btnUpdate.Location = new System.Drawing.Point(713, 219);
            this.btnUpdate.Name = "btnUpdate";
            this.btnUpdate.Size = new System.Drawing.Size(75, 23);
            this.btnUpdate.TabIndex = 4;
            this.btnUpdate.Text = "Update";
            this.btnUpdate.UseVisualStyleBackColor = true;
            this.btnUpdate.Click += new System.EventHandler(this.btnUpdate_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.childTableView);
            this.Controls.Add(this.btnUpdate);
            this.Controls.Add(this.parentTableView);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.parentTableView)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.childTableView)).EndInit();
            this.ResumeLayout(false);

        }

        private void Form1_Load1(object sender, System.EventArgs e)
        {
            throw new System.NotImplementedException();
        }

        #endregion

        private System.Windows.Forms.DataGridView parentTableView;
        private System.Windows.Forms.DataGridView childTableView;
        private System.Windows.Forms.Button btnUpdate;
    }
}

