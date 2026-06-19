#include <stdio.h>

#define FIELD_WIDTH 80
#define FIELD_HEIGHT 25
#define PADDLE_SIZE 3
#define WIN_SCORE 21

#define LEFT_PADDLE_X 2
#define RIGHT_PADDLE_X (FIELD_WIDTH - 3)

int leftPaddleY = FIELD_HEIGHT / 2 - 1;
int rightPaddleY = FIELD_HEIGHT / 2 - 1;

int ballX = FIELD_WIDTH / 2;
int ballY = FIELD_HEIGHT / 2;
int ballSpeedX = 1;
int ballSpeedY = 1;

int leftScore = 0;
int rightScore = 0;

int is_paddle_cell(int x, int y, int paddleX, int paddleY) {
    if (x != paddleX) {
        return 0;
    }

    if (y >= paddleY && y < paddleY + PADDLE_SIZE) {
        return 1;
    }

    return 0;
}

int is_valid_command(int command) {
    if (command == 'a' || command == 'A') {
        return 1;
    }

    if (command == 'z' || command == 'Z') {
        return 1;
    }

    if (command == 'k' || command == 'K') {
        return 1;
    }

    if (command == 'm' || command == 'M') {
        return 1;
    }

    if (command == ' ') {
        return 1;
    }

    return 0;
}

void clear_input_line(int firstChar) {
    int currentChar;

    if (firstChar == '\n' || firstChar == EOF) {
        return;
    }

    currentChar = getchar();

    while (currentChar != '\n' && currentChar != EOF) {
        currentChar = getchar();
    }
}

int read_command(void) {
    int command;

    while (1) {
        printf("Ход: A/Z - левая ракетка, K/M - правая ракетка, Space - пропуск: ");
        command = getchar();

        if (command == EOF) {
            return ' ';
        }

        clear_input_line(command);

        if (is_valid_command(command)) {
            return command;
        }

        printf("Неверная команда. Введите A, Z, K, M или Space.\n");
    }
}

void print_empty_lines(void) {
    int i;

    for (i = 0; i < 4; i++) {
        printf("\n");
    }
}

void draw_field(void) {
    int x;
    int y;

    print_empty_lines();
    printf("Player 1: %d    Player 2: %d\n", leftScore, rightScore);

    for (y = 0; y < FIELD_HEIGHT; y++) {
        for (x = 0; x < FIELD_WIDTH; x++) {
            if (y == 0 || y == FIELD_HEIGHT - 1) {
                printf("-");
            } else if (x == 0 || x == FIELD_WIDTH - 1) {
                printf("|");
            } else if (x == ballX && y == ballY) {
                printf("O");
            } else if (is_paddle_cell(x, y, LEFT_PADDLE_X, leftPaddleY)) {
                printf("|");
            } else if (is_paddle_cell(x, y, RIGHT_PADDLE_X, rightPaddleY)) {
                printf("|");
            } else {
                printf(" ");
            }
        }

        printf("\n");
    }
}

void move_left_paddle_up(void) {
    if (leftPaddleY <= 1) {
        return;
    }

    leftPaddleY--;
}

void move_left_paddle_down(void) {
    if (leftPaddleY + PADDLE_SIZE >= FIELD_HEIGHT - 1) {
        return;
    }

    leftPaddleY++;
}

void move_right_paddle_up(void) {
    if (rightPaddleY <= 1) {
        return;
    }

    rightPaddleY--;
}

void move_right_paddle_down(void) {
    if (rightPaddleY + PADDLE_SIZE >= FIELD_HEIGHT - 1) {
        return;
    }

    rightPaddleY++;
}

void apply_command(int command) {
    if (command == 'a' || command == 'A') {
        move_left_paddle_up();
        return;
    }

    if (command == 'z' || command == 'Z') {
        move_left_paddle_down();
        return;
    }

    if (command == 'k' || command == 'K') {
        move_right_paddle_up();
        return;
    }

    if (command == 'm' || command == 'M') {
        move_right_paddle_down();
    }
}

void reset_ball(int direction) {
    ballX = FIELD_WIDTH / 2;
    ballY = FIELD_HEIGHT / 2;
    ballSpeedX = direction;
    ballSpeedY = 1;
}

int ball_hits_left_paddle(int nextX, int nextY) {
    if (nextX != LEFT_PADDLE_X) {
        return 0;
    }

    if (nextY >= leftPaddleY && nextY < leftPaddleY + PADDLE_SIZE) {
        return 1;
    }

    return 0;
}

int ball_hits_right_paddle(int nextX, int nextY) {
    if (nextX != RIGHT_PADDLE_X) {
        return 0;
    }

    if (nextY >= rightPaddleY && nextY < rightPaddleY + PADDLE_SIZE) {
        return 1;
    }

    return 0;
}

void move_ball(void) {
    int nextX = ballX + ballSpeedX;
    int nextY = ballY + ballSpeedY;

    if (nextY <= 0 || nextY >= FIELD_HEIGHT - 1) {
        ballSpeedY = -ballSpeedY;
        nextY = ballY + ballSpeedY;
    }

    if (ball_hits_left_paddle(nextX, nextY)) {
        ballSpeedX = 1;
        nextX = ballX + ballSpeedX;
    }

    if (ball_hits_right_paddle(nextX, nextY)) {
        ballSpeedX = -1;
        nextX = ballX + ballSpeedX;
    }

    if (nextX <= 0) {
        rightScore++;
        reset_ball(1);
        return;
    }

    if (nextX >= FIELD_WIDTH - 1) {
        leftScore++;
        reset_ball(-1);
        return;
    }

    ballX = nextX;
    ballY = nextY;
}

void print_winner(void) {
    if (leftScore >= WIN_SCORE) {
        printf("\nПоздравляем! Победил игрок 1!\n");
        return;
    }

    printf("\nПоздравляем! Победил игрок 2!\n");
}

int main(void) {
    int command;

    printf("ASCII Pong\n");
    printf("Игра идет до %d очка.\n", WIN_SCORE);
    printf("После каждой команды нажимайте Enter.\n");

    draw_field();

    while (leftScore < WIN_SCORE && rightScore < WIN_SCORE) {
        command = read_command();
        apply_command(command);
        move_ball();
        draw_field();
    }

    print_winner();

    return 0;
}
