# In ParserOutput.py

class ParseTreeNode:
    def __init__(self, action, input_stack, work_stack, index, production=None, father=None):
        self.action = action
        self.input_stack = input_stack
        self.work_stack = work_stack
        self.index = index
        self.production = production
        self.father = father  # Link to father node
        self.sibling = None  # Link to sibling node
        self.children = []  # List of children (if any)

    def add_child(self, child):
        self.children.append(child)
        if len(self.children) > 1:
            self.children[-2].sibling = child  # Set the sibling relationship


class ParserOutput:
    def __init__(self):
        self.steps = []  # List of steps (parse tree nodes)
        self.success = False  # Success status

    def add_parse_step(self, action, input_stack, work_stack, index, production=None):
        # Create a new node for the parse step
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
        step_str += "-" * 50 + "\n"
        for child in node.children:
            step_str += self._get_parse_step_string(child, level + 1)
        return step_str
