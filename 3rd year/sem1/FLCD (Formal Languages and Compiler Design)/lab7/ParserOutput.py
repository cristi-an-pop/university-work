class ParseTreeNode:
    def __init__(self, action, input_stack, work_stack, index, production=None, father=None):
        self.action = action
        self.input_stack = input_stack
        self.work_stack = work_stack
        self.index = index
        self.production = production
        self.father = father
        self.sibling = None
        self.children = []

    def add_child(self, child):
        self.children.append(child)
        if len(self.children) > 1:
            self.children[-2].sibling = child


class ParserOutput:
    def __init__(self):
        self.steps = []
        self.success = False

    def add_parse_step(self, action, input_stack, work_stack, index, production=None):
        parent_node = self.steps[-1] if self.steps else None
        node = ParseTreeNode(action, input_stack, work_stack, index, production, parent_node)
        if parent_node:
            parent_node.add_child(node)

        self.steps.append(node)

    def set_successful(self, success: bool):
        """Sets the success status of the parsing."""
        self.success = success

    def print_to_screen(self):
        print("Parsing steps:")
        for step in self.steps:
            self._print_parse_step(step, level=0)

    def print_to_file(self, filename):
        with open(filename, 'w') as file:
            for step in self.steps:
                file.write(self._get_parse_step_string(step, level=0) + "\n")

    def _print_parse_step(self, node, level):
        indent = "  " * level
        print(f"{indent}Action: {node.action}")
        print(f"{indent}Input Stack: {' '.join(node.input_stack)}")
        print(f"{indent}Work Stack: {' '.join([str(item) for item in node.work_stack])}")
        print(f"{indent}Index: {node.index}")
        print(f"{indent}Production: {' '.join(node.production) if node.production else 'None'}")
        #print(f"{indent}Father: {str(node.father)}")
        print(f"{indent}Sibling: {str(node.sibling)}")
        print("-" * 50)
        for child in node.children:
            self._print_parse_step(child, level + 1)

    def _get_parse_step_string(self, node, level):
        indent = "  " * level
        step_str = f"{indent}Action: {node.action}\n"
        step_str += f"{indent}Input Stack: {' '.join(node.input_stack)}\n"
        step_str += f"{indent}Work Stack: {' '.join([str(item) for item in node.work_stack])}\n"
        step_str += f"{indent}Index: {node.index}\n"
        step_str += f"{indent}Production: {' '.join(node.production) if node.production else 'None'}\n"
        step_str += f"{indent}Father: {str(node.father)}\n"
        step_str += f"{indent}Sibling: {str(node.sibling)}\n"
        step_str += "-" * 50 + "\n"
        for child in node.children:
            step_str += self._get_parse_step_string(child, level + 1)
        return step_str

    def get_parsing_table(self):
        """Generate a table with nodes, actions, input stack, work stack, productions, father, and sibling."""
        table = []
        for idx, step in enumerate(self.steps):
            father_str = f"Node {self.steps.index(step.father)}" if step.father else "None"
            sibling_str = f"Node {self.steps.index(step.sibling)}" if step.sibling else "None"
            table.append({
                'Node': idx,
                'Action': step.action,
                'Input Stack': ' '.join(step.input_stack),
                'Work Stack': ' '.join([str(item) for item in step.work_stack]),
                'Production': ' '.join(step.production) if step.production else 'None',
                'Father': father_str,
                'Sibling': sibling_str
            })
        return table

    def print_parsing_table(self):
        """Print the parsing table."""
        table = self.get_parsing_table()
        print(
            f"{'Node':<10} {'Action':<20} {'Input Stack':<30} {'Work Stack':<30} {'Production':<20} {'Father':<15} {'Sibling':<15}")
        print("-" * 120)
        for row in table:
            print(
                f"{row['Node']:<10} {row['Action']:<20} {row['Input Stack']:<30} {row['Work Stack']:<30} {row['Production']:<20} {row['Father']:<15} {row['Sibling']:<15}")

    def print_parsing_table_to_file(self, filename):
        """Save the parsing table to a file."""
        table = self.get_parsing_table()
        with open(filename, 'w') as file:
            file.write(
                f"{'Node':<10} {'Action':<20} {'Input Stack':<30} {'Work Stack':<30} {'Production':<20} {'Father':<15} {'Sibling':<15}\n")
            file.write("-" * 120 + "\n")
            for row in table:
                file.write(
                    f"{row['Node']:<10} {row['Action']:<20} {row['Input Stack']:<30} {row['Work Stack']:<30} {row['Production']:<20} {row['Father']:<15} {row['Sibling']:<15}\n")
